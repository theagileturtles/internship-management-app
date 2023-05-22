import {
  createConnection,
  query
} from "../../../data_access/database";

import sessionExample from "../../../../../../session-example.json"

export default async function handler(req, res) {
  const {
    uuid
  } = req.query;

  let status;

  switch (req.query.action) {
    case "approve":
      status = "pending_for_sgk"
      break;
    case "reject":
      status = "rejected"
      break;
    default:
      res.status(400).json({
        error: "Bad Request"
      });
      return
  }
  const session = sessionExample.session;
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

  let connection;
  try {
     connection = createConnection();

    let response = await query(connection)("UPDATE internship_management_app.internship_applications " +
      "SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE uuid = UUID_TO_BIN(?)",
      [status, uuid]);

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