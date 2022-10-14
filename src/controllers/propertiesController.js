const db = require("../database/models");

module.exports = {
    listForLandlord: async function(req, res) {
        
        let propietario = await db.Landlords.findOne({
            where: {
                id: req.session.landlordIdInUse
            }
        })
        
        res.render('propertiesForLandlord', {title: 'Propiedades', propietario});
    },

    create: function(req, res) {
        res.render('propertiesCreate', {title: 'Nueva propiedad'});
    }
}