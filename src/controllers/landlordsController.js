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
    
    res.render('landlordsCreateSelf', {title: 'Nuevo propietario', propietario});
  },

  create: async function(req, res) {
    
    await db.Landlords.create({
      ...req.body,
      userId: req.session.loggedUser.id,
      category: "normalUser",
      adress: req.body.streetName + " Nº" + req.body.streetNumber,
      profilePhoto: req.file ? req.file.filename : "defaultUser.png"
    });

    res.redirect('/landlords');
  },

  dashboard: async function(req, res) {

    let propietario = await db.Landlords.findOne({
      where: {
        id: req.params.landlordId
      }
    })

    req.session.landlordIdInUse = propietario.id;
    
    res.render('landlordDashboard', {title: 'Dashboard', propietario});

  }
};
