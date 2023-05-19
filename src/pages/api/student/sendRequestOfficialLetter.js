import {
  createConnection,
  query
} from "../data_access/database";
  
const sessionData = require('./../../../../session-example.json');

//TODO: use auth middleware
export default async function handler(req, res) {
  
  if (req.method !== "POST") {
    res.status(405).json({
      error: "Method Not Allowed"
    });
    return;
  }

  try {
    const uuid = sessionData.session.user.uuid;

    if (!sessionData.session) {
      res.status(401).json({
        error: "Unauthorized"
      });
      return
    }
  
    // validate user_uuid
    // if (!isValidBinaryUUID(uuid)) {
    //     return res.status(400).json({ message: 'Invalid user_uuid.' });
    // }

    const reqBody = {
      company : req.body.company,
      type : req.body.type,
      message: req.body.message,
    }

    // connect to the database
    const connection = createConnection();
    
    const sql = `
      INSERT INTO internship_management_app.letter_requests 
      (user_uuid,company,type,message)
      values (UUID_TO_BIN(?), ?, ?, ?)
    `
    const q = query(connection);
    const rows = await q(sql, [uuid, reqBody.company, reqBody.type, reqBody.message]);
    // close the database connection
    connection.end();

    return res.status(200).json({ message : 'letter request saved successfully'});
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
