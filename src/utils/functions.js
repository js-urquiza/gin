module.exports = {
  periodicCreate: function (fechaInicio, duracion, tarea) {
    
    let mesInicio = fechaInicio.getMonth() + 2; // new Date le saca 1 y getMonth le saca otro.
    let anioInicio = fechaInicio.getFullYear();

    for (i = 1; i <= duracion; i++) {
      if (mesInicio <= 12) {

        tarea();

        mesInicio = mesInicio + 1;
      } else {
        anioInicio = anioInicio + 1;
        mesInicio = 1;
        i--;
      }
    }

  },
};
