const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');

// Contacts
router.get('/', async (req, res) => {
    const { user } = req.session;

    try {
        const contacts =  await Contact.find({ user });
        return res.render('list', { contacts });
    } catch (error) {
        return res.render('error', { error });
    }
});

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;

    try {
        const contact = id != 0 ? await Contact.findById(id) : null;
        return res.render('form', { contact });
    } catch (error) {
        return res.render('error', { error });
    }
});

router.post('/:id/edit', async (req, res) => {
    let { id } = req.params;
    const { name, email, phone, birthday } = req.body;
    const { user } = req.session;

    try {
        if (id == 0) {
            await Contact.create({ name, email, phone, birthday, user: user._id });
        } else {
            // const contact = await Contact.findById(id);
            // contact.name = name;
            // contact.email = email;
            // contact.phone = phone;
            // contact.birthday = birthday;
            // contact.save();

            await Contact.findByIdAndUpdate(id, { $set: { name, email, phone, birthday } });
        }

        return res.redirect('/');
    } catch (error) {
        return res.render('error', { error });
    }
});

router.get('/:id/delete', async (req, res) => {
    const { id } = req.params;

    try { 
        // const contact = await Contact.findById(id);
        // contact.remove();

        await Contact.findByIdAndDelete(id);

        return res.redirect('/');
    } catch (error) {
        return res.render('error', { error });
    }
});

module.exports = router;