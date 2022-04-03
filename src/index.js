const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const app = express();
app.enable('trust proxy')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const productController = require('./controllers/product.controllers')
const userController = require('./controllers/user.controllers');

const cartController = require('./controllers/cart.controllers')

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

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
app.use(express.static(__dirname));
app.use(cookieParser());

app.use(cors(corsOptions));
app.use(cors());


const { register, login } = require('./controllers/auth.controllers');

app.get('', (req, res) => {
  try {
    return res.redirect('views/index.html');
  } catch (error) {
    res.send(500).send({ err: error.message });
  }
});

app.use('/products/', productController)
app.use('/users', userController);
app.use('/cart', cartController);


app.post('/register', register);
app.post('/login', login);

module.exports = app;
