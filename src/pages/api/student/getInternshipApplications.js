import {
  createConnection,
  query
} from "../data_access/database";

const sessionData = require('./../../../../session-example.json');

export default async function handler(req, res) {

  if (req.method !== "GET") {
    res.status(405).json({
      error: "Method Not Allowed"
    });
  }
  
  try {
    const user = sessionData.session.user;
    const uuid = user.uuid;
    console.log(user)

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

    // get student internship applications from the database
    const sql = `
      SELECT company,sgk_entry,type,status,created_at 
      FROM internship_management_app.internship_applications
      WHERE user_uuid = ?
    `;
    const q = query(connection);
    const rows = await q(sql, [uuid]);
    // close the database connection
    connection.end();

    return res.status(200).json(rows);
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
