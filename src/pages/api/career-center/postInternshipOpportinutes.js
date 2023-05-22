import {
  createConnection,
  query
} from "../data_access/database";

const sessionData = require('./../../../../session-example.json');




export default function handler(req, res) {

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


    if (req.method === "POST") {
      const { companyName, type, fileName, description, applicationPage } = req.body;
      console.log(companyName, " ", type, " ", fileName, " ", description, " ",applicationPage)
  
      res.status(200).json({ message: "Publish successful" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  