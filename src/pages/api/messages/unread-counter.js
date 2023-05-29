const sessionData = require('./../../../../session-example.json');
import {
    createConnection,
    query
} from "../data_access/database"

export default async function handler(req,res){
    const session = sessionData.session;

    if(!session){
        return res.status(402).json({error:"Unauthorized"})
    }

    let connection;

    try {
        connection = createConnection()
        let response = await query(connection)("SELECT COUNT(*) AS count FROM internship_management_app.messages "+
        "WHERE messages.receiver_uuid = UUID_TO_BIN(?) AND messages.read = 0;",
        [session.user.uuid])

        res.status(200).json({
            data:response[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:"Internal Server Error"
        })
    }finally{
        if(connection){
            connection.end();
        }
    }
}