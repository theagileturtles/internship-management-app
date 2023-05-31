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

    let connection;
    try {
        connection =  createConnection();
        let response = await query(connection)("SELECT departments.name, departments.id  "+
        "FROM internship_management_app.departments")

        response = response.map((element)=>{
            return {
                label: element.name,
                value: element.id
            }
        })
        res.status(200).json({data:response})
    } catch (error) {
        res.status(400).json({error:"Internal Server Error"})
        console.log(error)
    }finally{
        if(connection){
            connection.end()
        }
    }
}