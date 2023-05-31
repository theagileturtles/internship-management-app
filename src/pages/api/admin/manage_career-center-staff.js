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

    if(req.method!=="PUT"){
        res.status(405).json({error:"Method not allowed"})
    }
    const body = JSON.parse(req.body)
    let promises = []
    let connection;
    try {
        connection =  createConnection();
        body.forEach(async (element)=>{
            promises.push(await query(connection)("UPDATE internship_management_app.users SET role_id = ? WHERE UUID = UUID_TO_BIN(?);",
            [element.roleID, element.UUID]))
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