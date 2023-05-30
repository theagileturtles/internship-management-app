const sessionData = require('./../../../../../session-example.json');
import {
    createConnection,
    query
} from "../../data_access/database"

export default async function handler(req, res) {
    const session = sessionData.session
    const {uuid} = req.query
    const body = JSON.parse(req.body)
    if(!session){
        res.status(401).json({error:"Unaouthorized"})
    }
    console.log(req.body)
    let connection
    try {
        connection = createConnection();
        const response = await query(connection)(
            "INSERT INTO internship_management_app.messages (sender_uuid, receiver_uuid, subject, message) VALUES(UUID_TO_BIN(?),UUID_TO_BIN(?), ?, ?)",
            [session.user.uuid, uuid, body.subject, body.message]);

        if(response.affectedRows === 1){
            res.status(200).json({message:"Successfully Sended"});
        }else{
            res.status(500).json({message:"Internal Server Error"});
        }
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        console.log(error)
    }finally{
        if(connection){
            connection.end();
        }
    }
}