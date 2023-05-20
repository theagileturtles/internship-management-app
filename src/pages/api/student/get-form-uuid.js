import {
    createConnection,
    query
} from "../data_access/database";

const sessionData = require('./../../../../session-example.json');

export default async function handler(req, res) {
    const session = sessionData.session;
    if (!session) {
        return res.status(400).json({
            error: "Unauthorized"
        })
    }
    let connection;
    try {
        connection = createConnection();
        const response = await query(connection)( "SELECT bin_to_uuid(uuid) AS uuid, created_at FROM internship_management_app.application_forms WHERE department_id = ?",
            [session.user.departmentID]);
        if (response.length > 0) {
            return res.status(200).json({
                data: {
                    UUID: response[0].uuid,
                    createdAt: new Date(new Date(response[0].created_at).getTime() - (new Date(response[0].created_at ).getTimezoneOffset() * 60000))
                  }
            })
        } else {
            return res.status(404).json({
                data: {
                    error: "Not found"
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {
                error: "Internal Server Error"
            }
        })
    } finally {
        if (connection) {
            connection.end();
        }
    }
}