const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userrouter');
const templateRouter = require('./routes/templaterouter');

const createServer = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/emailtemplate', templateRouter);
    app.get('*',(req, res) => {
        res.status(404).json({ message: "Sorry you in the wrong place"})
    });
    return app; 
};

module.exports = createServer;