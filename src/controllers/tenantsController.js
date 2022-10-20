const db = require('../database/models');

module.exports = {
    
    listForLandlord: async function(req, res) {
        let propietario = await db.Landlords.findOne({
            where: {
                id: req.session.landlordIdInUse
            }
        });

        let inquilinos = await db.Tenants.findAll({
            where: {
                landlordId: req.session.landlordIdInUse
            }
        })
        
        res.render('tenantsForLandlord', {title: 'Inquilinos', propietario, inquilinos});
    },

    showCreate: function(req, res) {
        res.send("Hola");
    },

    create: async function(req, res) {
        res.send("Hola");
    }
}