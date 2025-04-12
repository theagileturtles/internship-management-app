
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import {
    createConnection,
    query
} from "../data_access/database"

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        res.status(400).json({
            error: "Unauthorized"
        })
    }
    console.log(session.user.roleID)
    let connection;
    try {
        connection = createConnection()

        if (session.user.roleID == 2) {
            let instructorResponse = await query(connection)("SELECT BIN_TO_UUID(UUID) AS UUID, first_name AS firstName, " +
                "last_name AS lastName, title FROM internship_management_app.users, internship_management_app.instructors WHERE users.uuid = instructors.user_uuid " +
                "AND department_id = ? ORDER BY first_name", [session.user.departmentID])
            instructorResponse = instructorResponse.map((element) => {
                return {
                    UUID: element.UUID,
                    label: `${element.title}. ${element.firstName} ${element.lastName}`,
                    group:"Instructor"
                }
            })
            let careerCenterResponse = await query(connection)("SELECT BIN_TO_UUID(UUID) AS UUID, first_name AS firstName, " +
                "last_name AS lastName FROM internship_management_app.users WHERE role_id = 4",)
                careerCenterResponse = careerCenterResponse.map((element) => {
                return {
                    UUID: element.UUID,
                    label: `${element.firstName} ${element.lastName}`,
                    group:"Career Center"
                }
            })
            return res.status(200).json(instructorResponse.concat(careerCenterResponse))
        }else if(session.user.roleID == 3){
            let studentResponse = await query(connection)("SELECT BIN_TO_UUID(UUID) AS UUID, first_name AS firstName, " +
            "last_name AS lastName, school_uuid AS studentID FROM internship_management_app.users, internship_management_app.students WHERE users.uuid = students.user_uuid " +
            "AND department_id = ? ORDER BY school_uuid", [session.user.departmentID])
            studentResponse = studentResponse.map((element) => {
            return {
                UUID: element.UUID,
                label: `${element.studentID} - ${element.firstName} ${element.lastName}`,
                group:"Students"
            }
        })
        let careerCenterResponse = await query(connection)("SELECT BIN_TO_UUID(UUID) AS UUID, first_name AS firstName, " +
            "last_name AS lastName FROM internship_management_app.users WHERE role_id = 4",)
            careerCenterResponse = careerCenterResponse.map((element) => {
            return {
                UUID: element.UUID,
                label: `${element.firstName} ${element.lastName}`,
                group:"Career Center"
            }
        })
        return res.status(200).json(studentResponse.concat(careerCenterResponse))
        }else if(session.user.roleID == 4){
            let studentResponse = await query(connection)("SELECT BIN_TO_UUID(UUID) AS UUID, first_name AS firstName, internship_management_app.departments.name AS department, " +
            "last_name AS lastName, school_uuid AS studentID FROM internship_management_app.users, internship_management_app.students, internship_management_app.departments "+
            "WHERE users.uuid = students.user_uuid AND departments.id = department_id ORDER BY school_uuid ")
            studentResponse = studentResponse.map((element) => {
            return {
                UUID: element.UUID,
                label: `${element.studentID} - ${element.firstName} ${element.lastName}`,
                description:  element.department,
                group:"Students"
            }
        })
        let instructorResponse = await query(connection)("SELECT BIN_TO_UUID(UUID) AS UUID, first_name AS firstName,internship_management_app.departments.name AS department, " +
                "last_name AS lastName, title FROM internship_management_app.users, internship_management_app.instructors, internship_management_app.departments "+
                "WHERE users.uuid = instructors.user_uuid AND departments.id = department_id " +
                "ORDER BY first_name",)
            instructorResponse = instructorResponse.map((element) => {
                return {
                    UUID: element.UUID,
                    label: `${element.title}. ${element.firstName} ${element.lastName}`,
                    description:  element.department,
                    group:"Instructors"
                }
            })
        return res.status(200).json(instructorResponse.concat(studentResponse))
        }else{
            return res.status(400).json({error:"Bad Request"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    } finally {
        console.log("123")
        if (connection) {
            connection.end();
        }
    }
}