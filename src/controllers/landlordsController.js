const db = require("../database/models");

module.exports = {
  list: async function (req, res) {
    let propietarios = await db.Landlords.findAll({
        where: {
            userId: req.session.loggedUser.id
        }
    })
    
    res.render("landlords", { title: "Propietarios", propietarios });
  },
};
