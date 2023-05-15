import {
  createConnection,
  query
} from "../data_access/database";

import sessionExample from "../../../../session-example.json"
import AWS from "aws-sdk";

export default async function handler(req, res) {
  const session = sessionExample.session;
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

  let connection;
  try {
    connection = createConnection();
    let sql = "SELECT BIN_TO_UUID(uuid) AS uuid,created_at FROM internship_management_app.application_forms " +
      "WHERE department_id = ?";

    const response = await query(connection)(sql,
      [session.user.departmentID, req.query.status]);

    if (response.length === 0) {
      res.status(404).json({
        data: {
          url: null
        }
      })
    } else {
      res.status(200).json({
        data: {
          uuid: response[0].uuid
        }
      })
    }

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