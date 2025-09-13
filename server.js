const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const API_TOKEN = process.env.API_TOKEN || "MY_SECRET_TOKEN";

app.use(express.json());

// Endpoint generate key
app.post("/getkey", (req, res) => {
    const { id, token } = req.body;
    if (token !== API_TOKEN) {
        return res.status(403).json({ error: "Invalid token" });
    }

    // Random code 8 ký tự hex
    const randomCode = crypto.randomBytes(4).toString("hex").toUpperCase();
    const key = `Vxeze-${randomCode}`;

    res.json({ message: key });
});

// Start server
app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
