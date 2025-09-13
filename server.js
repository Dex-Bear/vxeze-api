const crypto = require("crypto");

app.post("/getkey", (req, res) => {
    const { id, token } = req.body;
    if (token !== API_TOKEN) {
        return res.status(403).json({ error: "Invalid token" });
    }

    // Tạo random code 8 ký tự hex
    const randomCode = crypto.randomBytes(4).toString("hex").toUpperCase();
    const key = `Vxeze-${randomCode}`;

    res.json({ message: key });
});
