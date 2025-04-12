import { getServerSession } from "next-auth";
import { internshipStatusConverter, letterStatusConverter, typeConverter } from "../../../utils/ResponseConverter";
import {
  createConnection,
  query
} from "../data_access/database";
import { authOptions } from "../auth/[...nextauth]";



export default async function handler(req, res) {

  if (req.method !== "GET") {
    res.status(405).json({
      error: "Method Not Allowed"
    });
  }
  
  try {
    const session = await getServerSession(req, res, authOptions)
    const user = session.user;
    const uuid = user.uuid;

    // check if user_uuid is provided
    if (!uuid) {
      return res.status(400).json({ message: 'there is no user_uuid information inside session-example.json' });
    }

    // validate user_uuid
    // if (!isValidBinaryUUID(uuid)) {
    //   return res.status(400).json({ message: 'Invalid user_uuid.' });
    // }

    // connect to the database
    const connection = createConnection();

    // get student internship applications from the database
    const sql = `
      SELECT BIN_TO_UUID(uuid) AS uuid, company, type ,message, status, created_at, updated_at, incomplete_internship
      FROM internship_management_app.letter_requests
      WHERE user_uuid = UUID_TO_BIN(?) ORDER BY created_at DESC;
    `;
    const q = query(connection);
    let rows = await q(sql, [uuid]);
    // close the database connection
    connection.end();

    rows = rows.map((element)=>{
      return {
        UUID: element.uuid,
        company: element.company,
        type: typeConverter(element.type),
        status: letterStatusConverter(element.status),
        createdAt: new Date(new Date(element.created_at).getTime() - (new Date(element.created_at ).getTimezoneOffset() * 60000)),
        updatedAt: new Date(new Date(element.updated_at).getTime() - (new Date(element.updated_at ).getTimezoneOffset() * 60000)),
        files:[{
          label: "Transcript",
          href: "/api/student/download/letter-request/transcript/"+element.uuid
        }],
        message: element.message,
        officialLetter: "/api/student/download/letter-request/official-letter/"+element.uuid
      }
    })

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
