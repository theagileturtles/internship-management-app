import {
  createConnection,
  query
} from "../../data_access/database";

import sessionExample from "../../../../../session-example.json"
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

  if (req.method !== "DELETE") {
    res.status(405).json({
      error: "Method Not Allowed"
    });
    return;
  }

  let connection;
  try {
    connection = createConnection();
    let sql = "DELETE FROM internship_management_app.application_forms " +
      "WHERE department_id = ?";

    const response = await query(connection)(sql,
      [session.user.departmentID]);

    if (response.affectedRows === 0) {
      res.status(404).json({
        data: {
          error:"Not Found"
        }
      })
    } else {
      res.status(200).json({
        data: {
          message:"Deleted Successfully"
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