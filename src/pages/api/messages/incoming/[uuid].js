const sessionData = require('./../../../../../session-example.json');
import { getServerSession } from "next-auth";
import {
    createConnection,
    query
} from "../../data_access/database"
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const {
        uuid
    } = req.query
    console.log(uuid)
    if (!session) {
        res.status(401).json({
            error: "Unaouthorized"
        })
    }

    let connection
    try {
        connection = createConnection();
        let response = await query(connection)(
           "SELECT BIN_TO_UUID(messages.uuid) UUID,messages.message,image,  BIN_TO_UUID(messages.sender_uuid) AS senderUUID, "+ 
            "first_name, last_name, title, subject, messages.created_at, messages.read, "+
            "school_uuid AS studentID, departments.name AS department, roles.name AS role "+
            "FROM internship_management_app.messages "+
            "JOIN internship_management_app.users ON users.UUID = messages.sender_uuid "+
            "LEFT JOIN internship_management_app.instructors ON  users.UUID = instructors.user_uuid "+
            "LEFT JOIN internship_management_app.students ON users.UUID = students.user_uuid "+
            "LEFT JOIN internship_management_app.departments ON instructors.department_id = departments.id OR students.department_id = departments.id "+
            "LEFT JOIN internship_management_app.roles ON users.role_id = roles.id "+
            "WHERE ? = BIN_TO_UUID(messages.uuid) " +
            "ORDER BY created_at DESC",
            [uuid]);

        const element = response[0]
        response = {
            messageUUID: element.UUID,
            message: element.message,
            image: element.image,
            subject: element.subject,
            senderUUID: element.senderUUID,
            read: element.read,
            name: `${element.title??""} ${element.first_name} ${element.last_name}`.trim(),
            description: `${element.department??""} ${element.role} ${element.studentID??""}`.trim() ,
            createdAt: new Date(new Date(element.created_at).getTime() - (new Date(element.created_at).getTimezoneOffset() * 60000)),
        }

        if(!element.read){
            await query(connection)(
                "UPDATE internship_management_app.messages SET messages.read = 1 WHERE messages.uuid = UUID_TO_BIN(?)",
                [uuid]
            )
        }

        res.status(200).json({
            data: response
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
        console.log(error)
    } finally {
        if (connection) {
            connection.end();
        }
    }
}