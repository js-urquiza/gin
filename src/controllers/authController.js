const { validationResult } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');

module.exports = {
    showRegister: function(req, res) {
        res.render('register', {title: 'Registro'});
    },

    showLogin: function(req, res) {
        res.render('login', {title: 'Iniciar sesión'})
    },

    showDashboard: function(req, res) {
        res.render('dashboard', {title: 'Dashboard'});
    },

    register: async function (req, res) {
        
        let resultValidation = validationResult(req);

        if (!resultValidation.isEmpty()) {
            return res.render('register', {
                title: 'Registro',
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        
        let userInDb = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        })

        if (userInDb) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya se encuentra registrado.'
                    }
                },
                oldData: req.body
            });
        } else {
            await db.Users.create({
                ...req.body,
                category: 'normalUser',
                password: bcrypt.hashSync(req.body.password, 10),
                profilePhoto: req.file ? req.file.fileName : 'defaultUser.png'
            })
            res.redirect('/login');
        }
    },

    login: async function(req, res) {
        
        let userToLogin = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        })

        console.log(userToLogin);

        if (userToLogin) {
            let passwordIsOk = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (passwordIsOk) {
                req.session.loggedUser = userToLogin;
                res.redirect('/dashboard');
                return;
            }
            return res.render("login", {
              errors: {
                email: {
                  msg: "Las credenciales son inválidas",
                },
              },
            });
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: 'Las credenciales son inválidas'
                }
            }
        })

    },

    logout: function(req, res) {
        req.session.destroy();
        return res.redirect('/');
    },

    emailVerification: function(req, res) {
        res.send('Funciona');
    }
}