require('dotenv').config();
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const path = "./data.json";

function loadData() {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify({ keys: {}, hwids: {} }, null, 2));
    }
    return JSON.parse(fs.readFileSync(path));
}

function saveData(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// ---------------- API ----------------
// Get key
app.post('/getkey', (req, res) => {
    const { id, token } = req.body;
    if (token !== process.env.API_TOKEN) return res.status(403).json({ message: "Invalid token" });

    const data = loadData();
    res.json({ message: data.keys[id] || "" });
});

// Save key
app.post('/savekey', (req, res) => {
    const { id, key, token } = req.body;
    if (token !== process.env.API_TOKEN) return res.status(403).json({ message: "Invalid token" });

    const data = loadData();
    data.keys[id] = key;
    saveData(data);
    res.json({ message: "Key saved" });
});

// Save HWID reset
app.post('/savehwid', (req, res) => {
    const { id, timestamp, token } = req.body;
    if (token !== process.env.API_TOKEN) return res.status(403).json({ message: "Invalid token" });

    const data = loadData();
    data.hwids[id] = timestamp;
    saveData(data);
    res.json({ message: "HWID saved" });
});

// Get HWID reset
app.post('/gethwid', (req, res) => {
    const { id, token } = req.body;
    if (token !== process.env.API_TOKEN) return res.status(403).json({ message: "Invalid token" });

    const data = loadData();
    res.json({ message: data.hwids[id] || 0 });
});

// ---------------- RUN ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
