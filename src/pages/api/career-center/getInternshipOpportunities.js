import { oppurtunityTypeConverter } from "../../../utils/ResponseConverter";
import {
    createConnection,
    query
  } from "../data_access/database";
  
  const sessionData = require('./../../../../session-example.json');
  
  export default async function handler(req, res) {
    const keyword = req.query.keyword
    if (req.method !== "GET") {
      res.status(405).json({
        error: "Method Not Allowed"
      });
    }
    
    try {
      const user = sessionData.session.user;
      const uuid = user.uuid;
      console.log(user)
      const params = [];
      // check if user_uuid is provided

  
      // validate user_uuid
      // if (!isValidBinaryUUID(uuid)) {
      //   return res.status(400).json({ message: 'Invalid user_uuid.' });
      // }
  
      // connect to the database
      const connection = createConnection();

      // TODO: Select internships that have not passed the application deadline
      let sql = `
        SELECT BIN_TO_UUID(uuid) AS uuid, header, company, explanation, website, type, created_at AS createdAt
        FROM internship_management_app.internship_opportunities
      `;

      if(keyword){
        sql += " WHERE explanation LIKE ? OR header LIKE ?"
        params.push("%"+keyword+"%")
        params.push("%"+keyword+"%")
      }

      sql+=" ORDER BY created_at DESC;"
      const q = query(connection);
      let rows = await q(sql,params);
      // close the database connection
      connection.end();
  
      rows = rows.map((element)=>{
        return{
          ...element,
          createdAt:  new Date(new Date(element.createdAt).getTime() - (new Date(element.createdAt ).getTimezoneOffset() * 60000)),
          type: oppurtunityTypeConverter(element.type),
          image: "/api/career-center/download/internship-opportunity/image/"+element.uuid
        }
      })
      return res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
  