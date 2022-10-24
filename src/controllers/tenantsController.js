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

    showCreate: async function(req, res) {
        let propietario = await db.Landlords.findOne({
          where: {
            id: req.session.landlordIdInUse,
          },
        });

        let inquilinos = await db.Tenants.findAll({
          where: {
            landlordId: req.session.landlordIdInUse,
          },
        });
        
        res.render('tenantsCreate', {title: 'Nuevo inquilino', propietario, inquilinos});
    },

    create: async function(req, res) {
        await db.Tenants.create({
          ...req.body,
          landlordId: req.session.landlordIdInUse,
          profilePhoto: req.file ? req.file.filename : "defaultTenant.png",
        });

        res.redirect('/tenants');
    }
}