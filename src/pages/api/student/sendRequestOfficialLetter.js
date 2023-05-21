import {
  createConnection,
  query
} from "../data_access/database";

const sessionData = require('./../../../../session-example.json');
import AWS from "aws-sdk";

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb'
      }
  }
}

//TODO: use auth middleware
export default async function handler(req, res) {

  if (req.method !== "POST") {
    res.status(405).json({
      error: "Method Not Allowed"
    });
    return;
  }

  try {

    if (!sessionData.session) {
      res.status(401).json({
        error: "Unauthorized"
      });
      return
    }

    // validate user_uuid
    // if (!isValidBinaryUUID(uuid)) {
    //     return res.status(400).json({ message: 'Invalid user_uuid.' });
    // }

    const reqBody = JSON.parse(req.body);

    // connect to the database
    const connection = createConnection();
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION
    });

    let uuid = await query(connection)(
      "SELECT UUID() as uuid")
    uuid = uuid[0].uuid
    await uploadToS3(s3, reqBody.blob, uuid, "transcript").then(async () => {
      const sql = `
    INSERT INTO internship_management_app.letter_requests 
    (uuid,user_uuid,company,type,message, incomplete_internship)
    values (UUID_TO_BIN(?),UUID_TO_BIN(?), ?, ?, ?, ?)
  `
      const q = query(connection);
      const rows = await q(sql, [uuid,sessionData.session.user.uuid, reqBody.company, reqBody.type, reqBody.message,reqBody.numberOfIncomplete]);
      // close the database connection
      connection.end();

      return res.status(200).json({
        message: 'letter request saved successfully'
      });
    }).catch(()=>{
      return res.status(500).json({
        message: 'Internal Server Error.'
      });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error.'
    });
  }
}


async function uploadToS3(s3, blob, uuid, filename) {
  const base64 = blob;
  const base64Data = Buffer.from(base64.replace(/^data:application\/\w+;base64,/, ""), "base64");
  console.log("ekledi"+filename)
  return s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME + "/letter-requests/" + uuid,
      Key: filename + ".pdf",
      Body: base64Data,
      ContentEncoding: "base64",
      ContentType: "application/pdf"
    }).promise()
}