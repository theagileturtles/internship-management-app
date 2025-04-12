import {
    createConnection,
    query
  } from "./data_access/database.js";
  
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
       "SELECT bin_to_uuid(UUID) AS uuid, users.image, first_name AS firstName, last_name AS lastName, "+
        "role_id AS roleID, school_uuid AS schoolID, title, (IFNULL(instructors.department_id, "+
        "students.department_id)) as departmentID  FROM internship_management_app.users "+
        "LEFT JOIN internship_management_app.students ON students.user_uuid = users.uuid "+
        "LEFT JOIN internship_management_app.instructors ON instructors.user_uuid = users.uuid "+
        "WHERE email = ?",
      [body.email]
    );
    if (users.length > 0) {
        res.status(200).json(users[0])
    }else{
        await query(connection)(
            "INSERT INTO internship_management_app.users (first_name, last_name, email, role_id, image) values(?,?,?,?,?);",
            [body.firstName, body.lastName, body.email, body.roleID, body.image])

        switch (body.roleID) {
            case 2:
                await query(connection)(
                    "INSERT INTO internship_management_app.students (user_uuid,school_uuid, department_id) values(@last_user_uuid,?,?);",
                    [body.schoolID, body.departmentID]
                )
                break;
            case 3:
                await query(connection)(
                    "INSERT INTO internship_management_app.instructors (user_uuid,title, department_id) values(@last_user_uuid,?,?);",
                    [body.title, body.departmentID]
                )
                break;
            default:
                break;
        }

        users = await query(connection)(
            "SELECT bin_to_uuid(UUID) AS uuid,users.image, first_name AS firstName, last_name AS lastName, "+
             "role_id AS roleID, school_uuid AS schoolID, title, (IFNULL(instructors.department_id, "+
             "students.department_id)) as departmentID  FROM internship_management_app.users "+
             "LEFT JOIN internship_management_app.students ON students.user_uuid = users.uuid "+
             "LEFT JOIN internship_management_app.instructors ON instructors.user_uuid = users.uuid "+
             "WHERE email = ?",
           [body.email]
         );
         res.status(200).json(users[0]);
    }
    connection.end();
  }