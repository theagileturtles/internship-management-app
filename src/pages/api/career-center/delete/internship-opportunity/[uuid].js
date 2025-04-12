import {
  createConnection,
  query
} from "../../../data_access/database";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

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

  const {
    uuid
  } = req.query;

  let connection;
  try {
     connection = createConnection();
   
    let response = await query(connection)("DELETE FROM internship_management_app.internship_opportunities " +
      "WHERE uuid = UUID_TO_BIN(?)",
      [uuid]);

   if(response.affectedRows === 1){
    res.status(200).json({
      data: {
        message:"Successfully Deleted"
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