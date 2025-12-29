require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// List of recipients
const recipients = [
    '+919014774418', // Parent 1
    '+919876543210', // Parent 2
    '+911112223334', // Nearby hospital 1
    '+911112223335'  // Nearby hospital 2
];

app.post('/send-sos', async (req, res) => {
    const { latitude, longitude } = req.body; // optional location

    const messageBody = `⚠️ Emergency! Help needed at: https://www.google.com/maps?q=${latitude},${longitude}`;

    try {
        const promises = recipients.map(number => 
            client.messages.create({
                body: messageBody,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: number
            })
        );

        const results = await Promise.all(promises);
        res.json({ success: true, messages: results.map(r => r.sid) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
