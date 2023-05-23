import {
  createConnection,
  query
} from "../data_access/database";

const sessionData = require('./../../../../session-example.json');
import AWS from "aws-sdk";
export default async function handler(req, res) {
  const session = sessionData.session
  if (req.method !== "POST") {
    res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  if (!session) {
    return res.status(401).json({
      error: "Unauthorized"
    })
  }

  if (req.body.companyName == "" || req.body.type == "" || req.body.description == "" || req.body.applicationPage == "") {
    res.status(400).json({
      error: "missigin params"
    })
  }
  let connection;
  try {
    const postData = {
      header: req.body.header,
      companyName: req.body.companyName,
      type: req.body.type,
      fileName: req.body.fileName,
      description: req.body.description,
      applicationPage: req.body.applicationPage,
      base64Data: req.body.imageData.base64Data,
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION
    });

    connection = createConnection();
    let uuid = await query(connection)(
      "SELECT UUID() as uuid")
    uuid = uuid[0].uuid

    const base64Data = Buffer.from(postData.base64Data.replace(/^data:image\/\w+;base64,/, ""), "base64");
    await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME + "/internship-opportunuties/" + uuid,
        Key: "image",
        Body: base64Data,
      })
      .promise().catch((err) => {
        console.log(err);
        return res.status(500).json({
          error: "An error occured while file is uploading."
        });
      })



    const sql = `
    INSERT INTO internship_management_app.internship_opportunities
    (uuid, header, company, explanation, website, type)
    VALUES(UUID_TO_BIN(?),?, ?, ?, ?, ?);
  `;
    const q = query(connection);
    const rows = await q(sql, [uuid, postData.header,
      postData.companyName,
      postData.description,
      postData.applicationPage,
      postData.type
    ]);

    // close the database connection
    connection.end();
    res.status(200).json({
      message: "Publish successful"
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal Server Error.'
    });
  }

}