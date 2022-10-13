const db = require("../database/models");

module.exports = {
  list: async function(req, res) {
    let propietarios = await db.Landlords.findAll({
        where: {
            userId: req.session.loggedUser.id
        }
    })
    
    res.render("landlords", { title: "Propietarios", propietarios });
  },
  
  showCreate: function(req, res) {
    res.render('landlordsCreate', {title: 'Crear nuevo propietario'});
  },

  showCreateSelf: async function(req, res) {
    let propietario = await db.Users.findOne({
      where: {
        id: req.session.loggedUser.id
      }
    })

    console.log(propietario);
    
    res.render('landlordsCreateSelf', {title: 'Nuevo propietario', propietario});
  }
};
