const db = require("../database/models");

module.exports = {
    listForLandlord: async function(req, res) {
        
        let propietario = await db.Landlords.findOne({
            where: {
                id: req.session.landlordIdInUse
            }
        });

        let propiedades = await db.Properties.findAll({
            where: {
                landlordId: req.session.landlordIdInUse
            }
        });

        let smallNavConfig = {
          backBtn: "/landlords/dashboard/" + propietario.id,
          h1:
            req.session.loggedUser.name + " " + req.session.loggedUser.lastName,
          newBtn: "/properties/create",
          searchBtn: "",
        };
        
        res.render("propertiesForLandlord", {
          title: "Propiedades",
          smallNavConfig,
          propietario,
          propiedades,
        });
    },

    showCreate: async function(req, res) {
        let propietario = await db.Landlords.findOne({
            where: {
                id: req.session.landlordIdInUse
            }
        });

        let smallNavConfig = {
          backBtn: "/landlords/dashboard/" + propietario.id,
          h1:
            req.session.loggedUser.name + " " + req.session.loggedUser.lastName,
          newBtn: "",
          searchBtn: "",
        };
        
        res.render("propertiesCreate", {
          title: "Nueva propiedad",
          smallNavConfig,
          propietario,
        });
    },

    create: async function(req, res) {
        await db.Properties.create({
          ...req.body,
          landlordId: req.session.landlordIdInUse,
          propertyPhoto: req.file ? req.file.filename : "defaultProperty.png"
        });

        res.redirect('/properties');
    }
}