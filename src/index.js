const express = require('express');
const bodyParser = require('body-parser');

const cron = require('node-cron');
const { PORT } = require('./config/serverConfig');
const { subscribeMessage, createChannel } = require('./utils/messageQueue');
const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-service');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');

const jobs = require('./utils/job');




const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
       // jobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //     'sam2128623@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like the support'
        // );
        
    });
}

setupAndStartServer();