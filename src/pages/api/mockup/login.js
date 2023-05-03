import { createConnection, query } from "../data_access/database";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const connection = createConnection();
  let users = await query(connection)(
    "SELECT BIN_TO_UUID(uuid) AS uuid, first_name AS firstName, " +
      "last_name AS lastName, email, role " +
      "FROM mockup_database.users " +
      "WHERE email = ? AND password = MD5(?);",
    [req.body.email, req.body.password]
  );
  if(typeof users[0] === "undefined"){
    res.status(404).json({error:"User is not found" });
    connection.end();
    return
  }
  let userDetails;
  switch (users[0].role) {
    case "student":
        userDetails = await query(connection)(
            "SELECT school_id AS schoolID FROM mockup_database.students WHERE user_uuid = UUID_TO_BIN(?)",
            [users[0].uuid]
        )
        if(typeof userDetails[0] === "undefined"){
            res.status(404).json({error:"User is not found" });
            connection.end();
            return
        }
        break;
    case "instructor":
        userDetails = await query(connection)(
            "SELECT title FROM mockup_database.instructors WHERE user_uuid = UUID_TO_BIN(?)",
            [users[0].uuid]
        )
        if(typeof userDetails[0] === "undefined"){
            res.status(404).json({error:"User is not found" });
            connection.end();
            return
        }
        break;
    default:
        break;
  }
  connection.end();
  res.status(200).json({ ...users[0], ...userDetails[0], uuid:undefined});
}