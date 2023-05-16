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
    let sql = "SELECT BIN_TO_UUID(internship_applications.uuid) AS UUID,  BIN_TO_UUID(users.uuid) AS userUUID, users.first_name AS firstName, users.last_name AS lastName ,company,school_id AS studentID, status, internship_applications.created_at AS createdAt " +
      "FROM internship_management_app.users, internship_management_app.students, internship_management_app.internship_applications " +
      "WHERE users.uuid = students.user_uuid AND internship_applications.user_uuid = users.uuid AND students.department_id = ?";

    if (req.query.status) {
      sql += " AND status = ?"
    } else {
      sql += ";"
    }


    let response = await query(connection)(sql,
      [session.user.departmentID, req.query.status]);

    response = response.map((element)=>{return {...element, createdAt: new Date(new Date(element.createdAt).getTime() - (new Date(element.createdAt ).getTimezoneOffset() * 60000))}})

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