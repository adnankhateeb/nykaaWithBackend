const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const app = express();
app.enable('trust proxy')
const bodyParser = require('body-parser')
app.use(bodyParser.json())


const userController = require('./controllers/user.controllers');
const kajalController = require('./controllers/kajal.controllers');
const perfumeController = require('./controllers/perfume.controllers');
const menController = require('./controllers/men.controllers');
const hairController = require('./controllers/hair.controllers');
const faceController = require('./controllers/face.controllers');
const healthController = require('./controllers/health.controllers');
const cartController = require('./controllers/cart.controllers')

// const corsOptions = {
//   origin: true, //included origin as true
//   credentials: true, //included credentials as true
// };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: process.env.SESSION_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(express.static("src/views"));
app.use(cookieParser());

// app.use(cors(corsOptions));
app.use(cors());


const { register, login } = require('./controllers/auth.controllers');

app.get('', (req, res) => {
  try {
    return res.redirect('views/index.html');
  } catch (error) {
    res.send(500).send({ err: error.message });
  }
});

app.use('/users', userController);
app.use('/cart', cartController);

app.use('/kajal', kajalController);
app.use('/perfume', perfumeController);
app.use('/men', menController);
app.use('/hair', hairController);
app.use('/face', faceController);
app.use('/health', healthController);

app.post('/register', register);
app.post('/login', login);

module.exports = app;
