const express = require('express');
const bodyParser = require('body-parser');

const cron = require('node-cron');
const { PORT } = require('./config/serverConfig');

const { sendBasicEmail } = require('./services/email-service');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);

        // sendBasicEmail(
        //     'support@admin.com',
        //     'sam2128623@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like the support'
        // );
        cron.schedule('*/5 * * * *', () => {
            console.log('running a task every 5 minutes');
        });
    });
}

setupAndStartServer();