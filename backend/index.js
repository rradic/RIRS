const express = require('express');
const { port } = require('./config/index');
const { connectToDatabase } = require('./db/index')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  
// const defineRoutes = () => {
//     app.use('/user', userRouter);
//     app.use('/class', classRouter);
//     app.use('/lecture', lectureRouter);
//     app.use('/auth', authRouter);
//     app.use('/notification', notificationRouter);
//     app.use('/assistant', assistantRouter);
//     app.use('/activity', activityRouter);
// }

const initServer = async () => {
    app.use(bodyParser.json())
    // defineRoutes();

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        connectToDatabase();
    });

}

initServer();