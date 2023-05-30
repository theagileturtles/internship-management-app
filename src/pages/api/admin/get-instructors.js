import {
    createConnection,
    query
  } from "../../api/data_access/database";
  
import sessionExample from "../../../../session-example.json"

export default function handler(req,res){
    const session = sessionExample.session;
    if(!session){
        res.status(401)
    }
}