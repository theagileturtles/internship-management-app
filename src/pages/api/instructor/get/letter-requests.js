import {
  createConnection,
  query
} from "../../data_access/database";

import sessionExample from "../../../../../session-example.json"
import { letterStatusConverter, typeConverter } from "@/utils/response-converter";

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
    let sql = "SELECT BIN_TO_UUID(letter_requests.uuid) AS UUID, BIN_TO_UUID(users.uuid) AS userUUID, users.first_name AS firstName, " +
      "users.last_name AS lastName, company,school_id AS studentID, status, letter_requests.created_at AS createdAt, message, type, incomplete_internship AS incompleteInternships " +
      "FROM internship_management_app.users, internship_management_app.students, internship_management_app.letter_requests " +
      "WHERE users.uuid = students.user_uuid AND letter_requests.user_uuid = users.uuid AND students.department_id = ?";

    if (req.query.status) {
      sql += " AND status = ?"
    } else {
      sql += ";"
    }


    let response = await query(connection)(sql,
      [session.user.departmentID, req.query.status?.split(",").map((element)=>element.trim())]);

      response = response.map((element) => {
        return {
          ...element,
          createdAt: new Date(new Date(element.createdAt).getTime() - (new Date(element.createdAt).getTimezoneOffset() * 60000)),
          status:letterStatusConverter(element.status),
          type: typeConverter(element.type),
          files: [{
              name: "Transcript",
              link: "http://localhost:3000/api/instructor/download/transcript/"+element.UUID,
            },
          ],
          officialLetter: element.status === "completed" ? "http://localhost:3000/api/instructor/download/transcript/"+element.UUID:undefined,
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