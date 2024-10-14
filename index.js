const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN'; // Replace this

app.use(bodyParser.json());

app.post('/trello-webhook', async (req, res) => {
    const { action } = req.body;

    // Customize the message to send to Discord
    const message = {
        content: `**${action.memberCreator.fullName}** ${action.type} on card **${action.data.card.name}**`
    };

    try {
        await axios.post(DISCORD_WEBHOOK_URL, message);
        res.status(200).send('Notification sent to Discord.');
    } catch (error) {
        console.error('Error sending to Discord:', error);
        res.status(500).send('Failed to send notification.');
    }
});

// Trello verification route to accept webhooks
app.head('/trello-webhook', (req, res) => res.sendStatus(200));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
