import {
    createConnection,
    query
  } from "../data_access/database";
  
  
  import AWS from "aws-sdk";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

  export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
  }

  export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const body = JSON.parse(req.body)
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

    if(!req.query.uuid){
    return res.status(400).json({
        error: "Bad Request"
        });
    }
  
    
    let connection;
    try {

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            region: process.env.AWS_S3_REGION
          });
        
          let promises = []
          body.files.forEach(element => {
            promises.push(uploadToS3(s3,element.blob,req.query.uuid,element.name));
          });
      
          Promise.all(promises).then(async ()=>{
            connection = createConnection();
            let sql = "UPDATE internship_management_app.internship_applications SET company = ?, type = ?,status = 'pending_for_coordinator' ,updated_at = CURRENT_TIMESTAMP WHERE BIN_TO_UUID(uuid) = ?";
        
            let response = await query(connection)(sql,[body.company, body.type ,req.query.uuid]);
        
              if(response.affectedRows === 1){
                  res.status(200).json({
                      message: "Successfully Updated"
                    })
              }else{
                  res.status(500).json({
                      error: "Error Occured"
                    })
              }
        
          }).catch((err)=>{
            res.status(500).json({
              error: "Internal Server Error"
            });
            console.log(err)
          })

      
    } catch (error) {
      res.status(500).json({
        error: "Internal Server Error"
      })
      console.log(error)
    } finally {
      if (connection) {
        connection.end();
      }
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