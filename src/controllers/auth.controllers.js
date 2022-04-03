const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
const express = require('express');

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    //checking email
    if (user) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    let userName = await User.findOne({ username: req.body.username });
    if (userName) {
      return res.status(400).send({ message: 'Username already exists' });
    }

    // if new user, create it or allow to register;
    // console.log(user);
    user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    // const token = generateToken(user);

    // console.log('token:', token);

    res.sendFile(path.join(__dirname, '/index.html'));
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //checked if mail exists
    if (!user) {
      return res.status(400).send('Wrong Email or Password');
    }

    //if email exists, check password;
    const match = user.checkPassword(req.body.password);

    // if it doesn't match
    if (!match) {
      return res.status(400).send({ message: 'Wrong Email or Password' });
    }

    // if it matches
    const token = generateToken(user);

    // console.log(path);
    let session = req.session;
    console.log('session:', session);

    res.cookie('token', token, {
      httpOnly: false,
    });
    if (user.isAdmin || user.isSeller) {
      res.sendFile( path.join( __dirname, 'src/views', 'index.html' ));
    } else {
      res.sendFile( path.join( __dirname, 'src/views', 'index.html' ));
    }

    // res.render('index', function (err, html) {
    //   res.send(token, 'http://127.0.0.1:5500/frontend/login.html');
    // });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { register, login };
