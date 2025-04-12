import {
  createConnection,
  query
} from "../../../data_access/database";
import AWS from "aws-sdk";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({
      error: "Unauthorized"
    });
    return
  }

  if (req.method !== "PUT") {
    res.status(405).json({
      error: "Method Not Allowed"
    });
    return;
  }

  const {
    uuid
  } = req.query;

  const blob = req.body

  let connection;
  try {
     connection = createConnection();
     const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION
    });

    const base64 = req.body;
    const base64Data = Buffer.from(base64.replace(/^data:application\/\w+;base64,/, ""), "base64");
    connection = createConnection();

   await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME + "/internship-applications/"+uuid,
        Key: "sgk-form.pdf",
        Body: base64Data,
        ContentEncoding: "base64",
        ContentType: "application/pdf"
      })
      .promise().catch((err) => {
        console.log(err);
        return res.status(500).json({
          error: "An error occured while file is uploading."
        });
      })
    let response = await query(connection)("UPDATE internship_management_app.internship_applications " +
      "SET status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE uuid = UUID_TO_BIN(?)",
      [uuid]);

   if(response.affectedRows === 1){
    res.status(200).json({
      data: {
        message:"Successfully Updated"
      }
    })
   }else{
    res.status(500).json({
      data: {
        error:"Internal Server Error"
      }
    })
   }

    

  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error"
    })
    console.log(error)
  } finally {
      connection.end();
  }
}