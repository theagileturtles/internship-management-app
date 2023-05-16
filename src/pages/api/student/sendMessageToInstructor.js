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

    if (req.body.subject == "" || req.body.message == "") {
        res.status(400).json({
            error: "Subject or Message field cant be empty"
        })
    }
    
    try {
      const user = sessionData.session.user;
      const uuid = user.uuid;
  
      // check if user_uuid is provided
      if (!uuid) {
        return res.status(400).json({ message: 'there is no user_uuid information inside session-example.json' });
      }
  
      // validate user_uuid
      if (!isValidBinaryUUID(uuid)) {
        return res.status(400).json({ message: 'Invalid user_uuid.' });
      }
  
      // connect to the database
      const connection = createConnection();

      const postData = {
        sender_uuid: uuid,
        recevier_uuid: "31bd279e-f1d9-11", // this will be updated
        subject: req.body.subject,
        message: req.body.message,
        created_at: new Date()
      }
      console.log(postData)
      
      // TODO: we should able to reach current student's instructor ids
      const sql = `
        INSERT INTO internship_management_app.messages
        (sender_uuid, recevier_uuid, subject, message, created_at)
        VALUES(?, ?, ?, ?, ?);
      `;
      const q = query(connection);
      const rows = await q(sql, [postData.sender_uuid, postData.recevier_uuid, postData.subject, postData.message, postData.created_at]);
      // close the database connection
      connection.end();
  
      return res.status(200).json({ message: 'message send successfuly.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
  
  function isValidBinaryUUID(uuid) {
    const uuidRegex = /^[a-f\d]{32}$/i;
    const hex = Buffer.from(uuid, 'binary').toString('hex');
    return uuidRegex.test(hex);
  }
  