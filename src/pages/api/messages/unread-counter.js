const sessionData = require('./../../../../session-example.json');
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import {
    createConnection,
    query
} from "../data_access/database"

export default async function handler(req,res){
    const session = await getServerSession(req, res, authOptions)

    if(!session){
        return res.status(401).json({error:"Unauthorized"})
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