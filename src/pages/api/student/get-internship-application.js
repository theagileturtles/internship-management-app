import {
    createConnection,
    query
  } from "../data_access/database";
  
  
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
  
  export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({
        error: "Unauthorized"
      });
      return
    }
  
    if (req.method !== "GET") {
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
      connection = createConnection();
      let sql = "SELECT BIN_TO_UUID(uuid) as UUID, company, type FROM internship_management_app.internship_applications WHERE BIN_TO_UUID(uuid) = ?";
  
      let response = await query(connection)(sql,[req.query.uuid]);
  
      response = {
          ...response[0],
           transcript: "http://localhost:3000/api/student/download/internship-application/transcript/"+response[0].UUID,
           applicationForm: "http://localhost:3000/api/student/download/internship-application/application-form/"+response[0].UUID,
        }

  
      res.status(200).json({
        data: response
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