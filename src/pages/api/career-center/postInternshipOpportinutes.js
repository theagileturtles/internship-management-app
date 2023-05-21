
export default function handler(req, res) {
    if (req.method === "POST") {
      const { companyName, type, fileName, description, applicationPage } = req.body;
      console.log(companyName, " ", type, " ", fileName, " ", description, " ",applicationPage)
  
      res.status(200).json({ message: "Publish successful" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  