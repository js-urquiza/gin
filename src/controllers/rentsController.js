const db = require("../database/models");

module.exports = {
  create: async function(req, res) {
    
    let fechaInicio = new Date(req.body.initialDate);
    let duracion = req.body.duration;
    let precio = req.body.amount;
    
    let mesInicio = fechaInicio.getMonth() + 2; // new Date le saca 1 y getMonth le saca otro.
    let anioInicio = fechaInicio.getFullYear();

    for (i = 1; i <= duracion; i++) {
      if (mesInicio <= 12) {
        let fechaVencStr = anioInicio + "/" + mesInicio + "/" + 10;
        let fechaVenc = new Date(fechaVencStr);

        await db.Rents.create({
          contractId: req.session.contractIdInUse,
          dueDate: fechaVenc,
          amount: precio,
        });

        mesInicio = mesInicio + 1;
      } else {
        anioInicio = anioInicio + 1;
        mesInicio = 1;
        i--;
      }
    }

    res.redirect('back');

  }
};
