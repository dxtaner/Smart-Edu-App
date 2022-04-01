const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { body } = require('express-validator');
const User = require("../models/User");

const router = express.Router();
router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('please enter your name'),

        body('email').isEmail().withMessage('please enter valid email')
        .custom((userEmail)=> {
            return User.findOne({email:userEmail}).then(user => {
                if (user) {
                    return Promise.reject('Email is already exists!')
                }
            })
        }),
        
        body('password').not().isEmpty().withMessage('please enter a password'),
    ]
    ,authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);

module.exports = router;
