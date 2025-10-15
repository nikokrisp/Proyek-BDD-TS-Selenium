const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// ensure output dir exists
const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// form submission handler
app.post("/submit", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).send("Validation failed: fields cannot be empty.");
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(outputDir, `form_${timestamp}.md`);

  const content = `# Form Submission\n\n**Name:** ${name}\n\n**Message:** ${message}\n\nSubmitted at: ${new Date().toLocaleString()}`;
  fs.writeFileSync(filePath, content);

  res.send(`
    <html>
      <body>
        <h1>Form saved successfully!</h1>
        <p>Saved as: ${path.basename(filePath)}</p>
        <a href="/">Back</a>
      </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
