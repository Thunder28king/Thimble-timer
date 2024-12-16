const express = require('express');
const app = express();

let users = {}; // This will store the lock state of users (use a database for production)

app.use(express.json());

// Check lock state
app.post('/check-lock', (req, res) => {
    const { userId } = req.body;
    const isLocked = users[userId] || false;
    res.json({ locked: isLocked });
});

// Lock a user
app.post('/lock', (req, res) => {
    const { userId } = req.body;
    users[userId] = true;
    res.json({ success: true });
});

// Unlock a user
app.post('/unlock', (req, res) => {
    const { userId } = req.body;
    users[userId] = false;
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));