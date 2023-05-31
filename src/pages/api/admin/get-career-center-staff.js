import {
    createConnection,
    query
  } from "../data_access/database";
  
import sessionExample from "../../../../session-example.json"
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req,res){
    const session = await getServerSession(req, res, authOptions)
    if(!session){
        res.status(401)
    }

    let connection;
    try {
        connection =  createConnection();
        let response = await query(connection)("SELECT BIN_TO_UUID(uuid) as uuid, first_name, last_name, role_id, created_at "+
        "FROM internship_management_app.users WHERE role_id IN (4 , 5)")

        response = response.map((element)=>{
            return {
                UUID:element.uuid,
                createdAt: new Date(new Date(element.created_at).getTime() - (new Date(element.created_at).getTimezoneOffset() * 60000)),
                label: `${element.first_name} ${element.last_name}`,
                roleID: element.role_id
            }
        })
        res.status(200).json({data: response})
    } catch (error) {
        res.status(400).json({error:"Internal Server Error"})
        console.log(error)
    }finally{
        if(connection){
            connection.end()
        }
    }
}