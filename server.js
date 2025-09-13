const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const API_TOKEN = process.env.API_TOKEN || "MY_SECRET_TOKEN";

app.use(express.json());

// Example endpoint
app.post("/getkey", (req, res) => {
    const { id, token } = req.body;
    if (token !== API_TOKEN) {
        return res.status(403).json({ error: "Invalid token" });
    }
    // Fake key, có thể thay bằng logic thật
    const key = `VXEZE-${id}-${Date.now()}`;
    res.json({ message: key });
});

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
