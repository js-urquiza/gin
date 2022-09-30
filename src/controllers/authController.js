module.exports = {
    showRegister: function(req, res) {
        res.render('register', {title: 'Registro'});
    },

    showLogin: function(req, res) {
        res.render('login', {title: 'Iniciar sesión'})
    },

    emailVerification: function(req, res) {
        res.send('Funciona');
    }
}