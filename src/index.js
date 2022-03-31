const express = require('express');
const cors = require('cors');

const userController = require('./controllers/user.controllers');
const kajalController = require('./controllers/kajal.controllers');
const perfumeController = require('./controllers/perfume.controllers');
const menController = require('./controllers/men.controllers');
const hairController = require('./controllers/hair.controllers');
const faceController = require('./controllers/face.controllers');
const healthController = require('./controllers/health.controllers');
const app = express();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

const { register, login } = require('./controllers/auth.controllers');

app.use('/users', userController);

app.use('/kajal', kajalController);
app.use('/perfume', perfumeController);
app.use('/men', menController);
app.use('/hair', hairController);
app.use('/face', faceController);
app.use('/health', healthController);

app.post('/register', register);
app.post('/login', login);

module.exports = app;
