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
        })
        
        res.render('propertiesForLandlord', {title: 'Propiedades', propietario, propiedades});
    },

    showCreate: function(req, res) {
        res.render('propertiesCreate', {title: 'Nueva propiedad'});
    },

    create: async function(req, res) {
        await db.Properties.create({
            ...req.body,
            landlordId: req.session.landlordIdInUse
        });

        res.redirect('/properties');
    }
}