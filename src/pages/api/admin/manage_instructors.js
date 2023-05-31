import {
    createConnection,
    query
  } from "../../api/data_access/database";
  
import sessionExample from "../../../../session-example.json"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req,res){
    const session = await getServerSession(req, res, authOptions)

    if(!session){
        res.status(401)
    }

    if(req.method!=="PUT"){
        res.status(405).json({error:"Method not allowed"})
    }
    const body = JSON.parse(req.body)
    let promises = []
    let connection;
    try {
        connection =  createConnection();
        body.forEach(async (element)=>{
            promises.push(await query(connection)("UPDATE internship_management_app.instructors SET department_id = ? WHERE user_uuid = UUID_TO_BIN(?)",
            [element.departmentID, element.UUID]))
        })
        Promise.all(promises).then(()=>{
            res.status(200).json({message:"Updated Successfully"})
        }).catch((err)=>{
            console.log(err)
            res.status(400).json({error:"Internal Server Error"})

        })
    } catch (error) {
        res.status(400).json({error:"Internal Server Error"})
        console.log(error)
    }finally{
        if(connection){
            connection.end()
        }
    }
}