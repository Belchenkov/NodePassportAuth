const express = require('express');
const router = express.Router();


const User = require('../models/user');

// Home Page
router.get('/', (req, res, next) => {
  res.render('index');
});

// Login Form
router.get('/login', (req, res, next) => {
    res.render('login');
});


// Register Form
router.get('/register', (req, res, next) => {
    res.render('register');
});

//  Process Register 
router.post('/register', (req, res, next) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email must be a valid email address').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('register', {
        errors: errors
        });
    } else {
       const newUser = new User ({
            name: name,
            username: username,
            email: email,
            password: password,
            password2: password2
       });

       User.registerUser(newUser, (err, user) => {
            if (err) throw err;

            req.flash('success_msg', 'You are registed and can come in!');
            res.redirect('/login');
       });
    }
});

module.exports = router;