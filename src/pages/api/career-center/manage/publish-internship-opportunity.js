import {
    createConnection,
    query
  } from "../../data_access/database";
  
  import sessionExample from "../../../../../session-example.json"

  export default async function handler(req, res) {
    const session = sessionExample.session;
    const body = req.body;
    if (!session) {
      res.status(401).json({
        error: "Unauthorized"
      });
      return
    }
  
    if (req.method !== "POST") {
      res.status(405).json({
        error: "Method Not Allowed"
      });
      return;
    }
  
    let connection;
    try {
      connection = createConnection();
      let uuid = await query(connection)("SELECT uuid()");
      uuid = uuid[0].uuid;

      let sql = "INSERT INTO internship_management_app.internship_opportunities (uuid,header,company,explanation,website,type) VALUES"+
      "(uuid_to_bin(?),?,?,?,?)";
  

      let response = await query(connection)(sql,
        [uuid, body.title, body.company, body.description, body.website, body.type]);
  
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