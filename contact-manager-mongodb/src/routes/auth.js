const crypto = require('crypto');
const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Auth
router.get('/login', async (req, res) => {
    return res.render('login', { message: '' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const hash = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const user = await User.findOne({ username, password: hash });

    if (user) {
        const session = req.session;
        session.auth = true;
        session.user = user;

        return res.redirect('/');
    }

    return res.render('login', { message: 'Bad credentials!' });
});

router.get('/register', async (req, res) => {
    return res.render('register');
});

router.post('/register', async (req, res) => {
    const { name, email, username, password } = req.body;
    const hash = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');

    await User.create({
        name,
        email,
        username,
        password: hash
    });

    return res.redirect('/login');
});

module.exports = router;