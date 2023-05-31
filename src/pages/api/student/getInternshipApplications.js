import { getServerSession } from "next-auth";
import { internshipStatusConverter, typeConverter } from "../../../utils/ResponseConverter";
import {
  createConnection,
  query
} from "../data_access/database";
import { authOptions } from "../auth/[...nextauth]";

const sessionData = require('./../../../../session-example.json');

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
      SELECT BIN_TO_UUID(uuid) AS uuid, company,sgk_entry,type,status,created_at, updated_at
      FROM internship_management_app.internship_applications
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
        status: internshipStatusConverter(element.status),
        createdAt: new Date(new Date(element.created_at).getTime() - (new Date(element.created_at ).getTimezoneOffset() * 60000)),
        updatedAt: new Date(new Date(element.updated_at).getTime() - (new Date(element.updated_at ).getTimezoneOffset() * 60000)),
        sgkForm: element.status === "approved" ? "http://localhost:3000/api/student/download/internship-application/sgk-form/"+element.uuid:undefined,
        files:[{
          label: "Transcript",
          href: "/api/student/download/internship-application/transcript/"+element.uuid
          
        },
        {
          label: "Application Form",
          href: "/api/student/download/internship-application/application-form/"+element.uuid
          
        }
      ]
      }
    })

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
}
