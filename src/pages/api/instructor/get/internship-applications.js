import {
  createConnection,
  query
} from "../../data_access/database";

import sessionExample from "../../../../../session-example.json"

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
    let sql = "SELECT BIN_TO_UUID(internship_applications.uuid) AS uuid,  BIN_TO_UUID(users.uuid) AS user_uuid, users.first_name, users.last_name,company,school_id, status, internship_applications.created_at " +
      "FROM internship_management_app.users, internship_management_app.students, internship_management_app.internship_applications " +
      "WHERE users.uuid = students.user_uuid AND internship_applications.user_uuid = users.uuid AND students.department_id = ?";

    if (req.query.status) {
      sql += " AND status = ?"
    } else {
      sql += ";"
    }


    const response = await query(connection)(sql,
      [session.user.departmentID, req.query.status]);
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