import {
    createConnection,
    query
} from "../data_access/database";

export default async function handler(req, res) {
    const body = req.body
    if (req.method !== "POST") {
        res.status(405).json({
            error: "Method Not Allowed"
        });
        return;
    }

    const connection = createConnection();
    try {
        await query(connection)(
            "INSERT INTO mockup_database.users (first_name, last_name, email, password, role_id,image) values(?,?,?,MD5(?),?,?);",
            [body.firstName, body.lastName, body.email, body.password, body.role, body.image])


        switch (body.role) {
            case 2:
                await query(connection)(
                    "INSERT INTO mockup_database.students (user_uuid,school_id, department_id) values(@last_user_uuid,?,?);",
                    [body.schoolID, body.departmentID]
                )
                break;
            case 3:
                await query(connection)(
                    "INSERT INTO mockup_database.instructors (user_uuid,title, department_id) values(@last_user_uuid,?,?);",
                    [body.title, body.departmentID]
                )
                break;
            default:
                break;
        }
        res.status(200).json({
            message: "Done"
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: "Bad Request"
        });
    } finally {
        connection.end()
    }


}