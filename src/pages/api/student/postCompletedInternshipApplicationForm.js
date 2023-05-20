import {
  createConnection,
  query
} from "../data_access/database";

import sessionExample from "../../../../session-example.json"

import AWS from "aws-sdk";

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb'
      }
  }
}

export default async function handler(req, res) {
  const session = sessionExample.session;
  const body = JSON.parse(req.body);
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION
    });
    const connection = createConnection();
    let uuid = await query(connection)(
      "SELECT UUID() as uuid")
    uuid = uuid[0].uuid
    let promises = []
    body.files.forEach(element => {
      promises.push(uploadToS3(s3,element.blob,uuid,element.name));
    });

    Promise.all(promises).then(async ()=>{
      await query(connection)("INSERT INTO internship_management_app.internship_applications (uuid,user_uuid, company, type) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),?,?);",
      [uuid,session.user.uuid, body.company, body.type]);
      res.status(200).json({
        data:{
          message:"Application is created successfully."
        }
      })
    }).catch((err)=>{
      res.status(500).json({
        error: "Internal Server Error"
      });
      console.log(err)
    })


  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error"
    });
    console.log(error)
  }

}

function uploadToS3(s3, blob, uuid, filename) {
  const base64 = blob;
  const base64Data = Buffer.from(base64.replace(/^data:application\/\w+;base64,/, ""), "base64");

  return s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME + "/internship-applications/" + uuid,
      Key: filename + ".pdf",
      Body: base64Data,
      ContentEncoding: "base64",
      ContentType: "application/pdf"
    })
    .promise()
}