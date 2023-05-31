import {
  createConnection,
  query
} from "../../data_access/database";

import sessionExample from "../../../../../session-example.json"

import AWS from "aws-sdk";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb'
      }
  }
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  let connection;
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION
    });

    const base64 = req.body;
    const base64Data = Buffer.from(base64.replace(/^data:application\/\w+;base64,/, ""), "base64");
    connection = createConnection();
    let uuid = await query(connection)(
      "SELECT UUID() as uuid")
      uuid = uuid[0].uuid
    const uploadedPDF = await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME + "/application-forms",
        Key: uuid+".pdf",
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


    const response = await query(connection)(
      "SELECT * FROM " +
      "internship_management_app.application_forms " +
      "WHERE department_id = ?;",
      [session.user.departmentID]);

      if(response.length>0){
        await query(connection)(
          "DELETE FROM internship_management_app.application_forms WHERE department_id = ?;",
          [session.user.departmentID]);
      }
 
    await query(connection)("INSERT INTO internship_management_app.application_forms (uuid, department_id) VALUES (UUID_TO_BIN(?),?);",
      [uuid, session.user.departmentID,]);

    return res.status(200).json({
      uploadedPDF
    })

  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error"
    });
  } finally{
    if(connection){
      connection.end();
    }
  }

}