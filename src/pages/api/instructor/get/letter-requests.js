import {
  createConnection,
  query
} from "../../data_access/database";


import { letterStatusConverter, typeConverter } from "../../../../utils/ResponseConverter";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

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

  let connection;
  try {
    connection = createConnection();
    let sql = "SELECT BIN_TO_UUID(letter_requests.uuid) AS UUID,image, BIN_TO_UUID(users.uuid) AS userUUID, users.first_name AS firstName, " +
      "users.last_name AS lastName, company,school_id AS studentID, status, letter_requests.created_at AS createdAt, letter_requests.updated_at, message, type, incomplete_internship AS incompleteInternships " +
      "FROM internship_management_app.users, internship_management_app.students, internship_management_app.letter_requests " +
      "WHERE users.uuid = students.user_uuid AND letter_requests.user_uuid = users.uuid AND students.department_id = ? "

    if (req.query.status) {
      sql += " AND status = ? "
    }
    sql += "ORDER BY internship_management_app.letter_requests.updated_at DESC;"

    let response = await query(connection)(sql,
      [session.user.departmentID, req.query.status?.split(",").map((element)=>element.trim())]);

      response = response.map((element) => {
        return {
          ...element,
          createdAt: new Date(new Date(element.createdAt).getTime() - (new Date(element.createdAt).getTimezoneOffset() * 60000)),
          updatedAt: new Date(new Date(element.updated_at).getTime() - (new Date(element.updated_at ).getTimezoneOffset() * 60000)),
          status:letterStatusConverter(element.status),
          type: typeConverter(element.type),
          image:element.image,
          files: [{
              name: "Transcript",
              link: "http://localhost:3000/api/instructor/download/letter-request/transcript/"+element.UUID,
            },
          ],
          officialLetter: element.status === "completed" ? "http://localhost:3000/api/instructor/download/letter-request/official-letter/"+element.UUID:undefined,
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