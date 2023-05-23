import sessionExample from "../../../../../../../session-example.json"
import AWS from "aws-sdk";

export default async function handler(req, res) {
    const session = sessionExample.session;
    const { uuid } = req.query;
    const extension = req.query.extension || "png"
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

        let image = s3.getObject({
            Bucket: process.env.AWS_S3_BUCKET_NAME + "/internship-opportunuties/"+uuid,
            Key: "image",
        }).createReadStream()

        image.pipe(res)

    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
        console.log(error)
    }

}