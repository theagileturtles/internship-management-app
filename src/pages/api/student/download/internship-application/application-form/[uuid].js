import { getServerSession } from "next-auth";

import AWS from "aws-sdk";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    const { uuid } = req.query;
    if (!session) {
        res.status(401).json({
            error: "Unauthorized"
        });
        return
    }

    if (req.method !== "GET") {
        res.status(405).json({
            error: "Method Not Allowed"
        });
        return;
    }

    try {
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            region: process.env.AWS_S3_REGION
        });

        let form = s3.getObject({
            Bucket: process.env.AWS_S3_BUCKET_NAME + "/internship-applications/"+uuid,
            Key: "application-form" + ".pdf",
        }).createReadStream()

        form.pipe(res)

    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
        console.log(error)
    }

}