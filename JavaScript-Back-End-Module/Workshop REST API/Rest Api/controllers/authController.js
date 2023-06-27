const { register, login, logout } = require('../services/userService');
const errParser = require('../util/parser');

const router = require('express').Router();
const { body, validationResult } = require('express-validator')

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const payload = await login(email, password);
        res.status(201).json(payload);

    } catch (error) {
        const message = errParser(error);
        res.status(401).json({ message })
    }
})

router.post('/register',
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 3 }).withMessage('Password is too short'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors
            }
            const { email, password } = req.body;

            const payload = await register(email, password);
            res.status(201).json(payload);

        } catch (error) {
            const message = errParser(error);
            res.status(403).json({ message })
        }
    })

router.get('/logout', async (req, res) => {
    const token = req.token;
    await logout(token);
    res.status(204).json({ message: 'You are logged out!' })
})


module.exports = router