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
        let response = await query(connection)("SELECT BIN_TO_UUID(uuid) as uuid,title, first_name, last_name, departments.name,departments.id AS department_id, created_at "+
        "FROM internship_management_app.users INNER JOIN internship_management_app.instructors ON instructors.user_uuid = users.uuid "+
        "INNER JOIN internship_management_app.departments ON departments.id = instructors.department_id " + 
        "WHERE role_id = 3")

        response = response.map((element)=>{
            return {
                UUID:element.uuid,
                createdAt: new Date(new Date(element.created_at).getTime() - (new Date(element.created_at).getTimezoneOffset() * 60000)),
                label: `${element.title} ${element.first_name} ${element.last_name}`,
                departmentID: element.department_id
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