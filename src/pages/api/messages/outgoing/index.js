const sessionData = require('./../../../../../session-example.json');
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import {
    createConnection,
    query
} from "../../data_access/database"

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    if(!session){
        res.status(401).json({error:"Unaouthorized"})
    }

    let connection
    try {
        connection = createConnection();
        let response = await query(connection)(
            "SELECT BIN_TO_UUID(messages.uuid) UUID, BIN_TO_UUID(messages.receiver_uuid) AS  receiverUUID,  first_name, last_name, title, subject, messages.created_at FROM internship_management_app.messages "+
            "JOIN internship_management_app.users ON users.UUID = messages.receiver_uuid "+
            "LEFT JOIN internship_management_app.instructors ON  users.UUID = instructors.user_uuid "+
            "WHERE UUID_TO_BIN(?) = sender_uuid "+
            "ORDER BY created_at DESC",
            [session.user.uuid]);
         response = response.map((element)=>{
            return{
              messageUUID: element.UUID,
              receiverUUID: element.receiverUUID,
              name:`${element.title??""} ${element.first_name} ${element.last_name}`.trim() ,
              subject: element.subject,
              createdAt: new Date(new Date(element.created_at).getTime() - (new Date(element.created_at).getTimezoneOffset() * 60000)),

            }
         })
        res.status(200).json({data:response})
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error)
    }finally{
        if(connection){
            connection.end();
        }
    }
}