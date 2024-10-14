const axios = require('axios'); // CommonJS syntax

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1295417038961115136/fsH0-K-oySgWFQ2YYouwyG_8DqEM8UJgbH7OWa-_E4-E69iMfQZK9RsHsCsTP3M0b51T';

app.use(bodyParser.json());

app.post('/trello-webhook', async (req, res) => {
    const { action } = req.body;
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

app.head('/trello-webhook', (req, res) => res.sendStatus(200));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
