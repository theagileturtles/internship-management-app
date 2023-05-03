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
            "INSERT INTO mockup_database.users (first_name, last_name, email, password, role) values(?,?,?,MD5(?),?);",
            [body.firstName, body.lastName, body.email, body.password, body.role])

        body.departments.map(async (department) => {
            await query(connection)(
                "INSERT INTO mockup_database.department_relations (user_uuid,department) values(@last_uuid, ?);",
                [department])
        })

        switch (body.role) {
            case "student":
                await query(connection)(
                    "INSERT INTO mockup_database.students (user_uuid,school_id) values(@last_uuid,?);",
                    [body.schoolID]
                )
                break;
            case "instructor":
                await query(connection)(
                    "INSERT INTO mockup_database.instructors (user_uuid,title) values(@last_uuid,?);",
                    [body.title]
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