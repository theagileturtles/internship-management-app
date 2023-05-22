import {
  createConnection,
  query
} from "../data_access/database";

const sessionData = require('./../../../../session-example.json');

export default async function handler(req, res) {

  if (req.method !== "POST") {
    res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  if (req.body.companyName == "" || req.body.type == "" || req.body.fileName == "" || req.body.description == "" || req.body.applicationPage =="") {
      res.status(400).json({
          error: "missigin params"
      })
  }

  const user = sessionData.session.user;
  const uuid = user.uuid;

  // check if user_uuid is provided
  if (!uuid) {
    return res.status(400).json({ message: 'invalid session id' });
  }

  try {
      
    const connection = createConnection();

    const postData = {
      companyName: req.body.companyName,
      type: req.body.type,
      fileName: req.body.fileName,
      description: req.body.description,
      applicationPage: req.body.applicationPage,
      created_at: new Date()
    }
    console.log(postData)

    const sql = `
    INSERT INTO internship_management_app.internship_opportunities
    (header, company, explanation, website, type, created_at)
    VALUES(?, ?, ?, ?, ?, ?);
  `;
    const q = query(connection);
    const rows = await q(sql, [postData.companyName, 
                            postData.companyName, 
                            postData.description,
                            postData.applicationPage, 
                            postData.type, 
                            postData.created_at]);

    // close the database connection
    connection.end();
    res.status(200).json({ message: "Publish successful" });

  } catch(error) {
      return res.status(500).json({ message: 'Internal Server Error.' });
  }

}
  