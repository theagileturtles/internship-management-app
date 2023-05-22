import {
  createConnection,
  query
} from "../../data_access/database";

import sessionExample from "../../../../../session-example.json"
import { internshipStatusConverter, typeConverter } from "@/utils/ResponseConverter";

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
    let sql = "SELECT BIN_TO_UUID(internship_applications.uuid) AS UUID,  BIN_TO_UUID(users.uuid) AS userUUID, users.first_name AS firstName, " +
      "users.last_name AS lastName ,company,school_id AS studentID, status, internship_applications.created_at AS createdAt, internship_applications.updated_at, internship_applications.type AS type " +
      "FROM internship_management_app.users, internship_management_app.students, internship_management_app.internship_applications " +
      "WHERE users.uuid = students.user_uuid AND internship_applications.user_uuid = users.uuid AND students.department_id = ?";

    if (req.query.status) {
      sql += "AND status IN (?)"
    } else {
      sql += ";"
    }

    let response = await query(connection)(sql,
      [session.user.departmentID, req.query.status?.split(",").map((element)=>element.trim())]);

    response = response.map((element) => {
      return {
        ...element,
        createdAt: new Date(new Date(element.createdAt).getTime() - (new Date(element.createdAt).getTimezoneOffset() * 60000)),
        updatedAt: new Date(new Date(element.updated_at).getTime() - (new Date(element.updated_at ).getTimezoneOffset() * 60000)),
        status:internshipStatusConverter(element.status),
        type: typeConverter(element.type),
        files: [{
            name: "Transcript",
            link: "http://localhost:3000/api/instructor/download/internship-application/transcript/"+element.UUID,
          },
          {
            name: "Application Form",
            link: "http://localhost:3000/api/instructor/download/internship-application/application-form/"+element.UUID,
          }
        ]
      }
    })

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