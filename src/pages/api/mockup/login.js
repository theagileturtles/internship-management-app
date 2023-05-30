import {
  createConnection,
  query
} from "../data_access/database";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({
      error: "Method Not Allowed"
    });
    return;
  }

  const body = JSON.parse(req.body)
  const connection = createConnection();
  let users = await query(connection)(
    "SELECT BIN_TO_UUID(uuid) AS uuid, first_name AS firstName, " +
    "last_name AS lastName, email, role_id AS roleID " +
    "FROM mockup_database.users " +
    "WHERE email = ? AND password = MD5(?);",
    [body.email, body.password]
  );
  if (typeof users[0] === "undefined") {
    res.status(404).json({
      error: "User is not found"
    });
    connection.end();
    return
  }
  let userDetails;
  let userDepartments = []


  switch (users[0].roleID) {
    case 2:
      userDetails = await query(connection)(
        "SELECT school_id AS schoolID, department_id AS departmentID FROM mockup_database.students WHERE user_uuid = UUID_TO_BIN(?)",
        [users[0].uuid]
      )
      if (typeof userDetails[0] === "undefined") {
        res.status(404).json({
          error: "User is not found"
        });
        connection.end();
        return
      }
      break;
    case 3:
      userDetails = await query(connection)(
        "SELECT title, department_id AS departmentID FROM mockup_database.instructors WHERE user_uuid = UUID_TO_BIN(?)",
        [users[0].uuid]
      )
      if (typeof userDetails[0] === "undefined") {
        res.status(404).json({
          error: "User is not found"
        });
        connection.end();
        return
      }
      break;
    default:
      break;
  }
  connection.end();
  res.status(200).json({
    ...users[0],
    ...userDetails[0],
    uuid: undefined,
  });
}