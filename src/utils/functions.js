let db = require('../database/models');

module.exports = {
  createPeriodicRent: function (fecha, duracion, precio, contrato) {
    let fechaInicio = new Date(fecha);
    let mesInicio = fechaInicio.getMonth() + 2; // new Date le saca 1 y getMonth le saca otro.
    let anioInicio = fechaInicio.getFullYear();

    for (i = 1; i <= duracion; i++) {
      if (mesInicio <= 12) {
        let fechaVencStr = anioInicio + "/" + mesInicio + "/" + 10;
        let fechaVenc = new Date(fechaVencStr);

        db.Transactions.create({
          contractId: contrato,
          date: fechaVenc,
          name: 'Alquiler',
          amount: precio,
        });

        mesInicio = mesInicio + 1;
      } else {
        anioInicio = anioInicio + 1;
        mesInicio = 1;
        i--;
      }
    }
  },

  createPeriodicExpense: function (fecha, duracion, nombre, precio, coeficiente, contrato) {
    let fechaInicio = new Date(fecha);
    let mesInicio = fechaInicio.getMonth() + 2; // new Date le saca 1 y getMonth le saca otro.
    let anioInicio = fechaInicio.getFullYear();

    for (i = 1; i <= duracion; i++) {
      if (mesInicio <= 12) {
        let fechaVencStr = anioInicio + "/" + mesInicio + "/" + 10;
        let fechaVenc = new Date(fechaVencStr);

        db.Transactions.create({
          contractId: contrato,
          date: fechaVenc,
          name: nombre,
          amount: precio,
          coeff: coeficiente
        });

        mesInicio = mesInicio + 1;
      } else {
        anioInicio = anioInicio + 1;
        mesInicio = 1;
        i--;
      }
    }
  },

  numberToMonth: function (number) {
    switch (number) {
      case 1: {
        let mes = "enero";
        return mes;
      }
      case 2: {
        let mes = "febrero";
        return mes;
      }
      case 2: {
        let mes = "marzo";
        return mes;
      }
      case 2: {
        let mes = "abril";
        return mes;
      }
      case 2: {
        let mes = "mayo";
        return mes;
      }
      case 2: {
        let mes = "junio";
        return mes;
      }
      case 2: {
        let mes = "julio";
        return mes;
      }
      case 2: {
        let mes = "agosto";
        return mes;
      }
      case 2: {
        let mes = "septiembre";
        return mes;
      }
      case 2: {
        let mes = "octubre";
        return mes;
      }
      case 2: {
        let mes = "noviembre";
        return mes;
      }
      case 2: {
        let mes = "diciembre";
        return mes;
      }
    }
  },

  prueba: function() {
    
    let transactionMonth = transacciones.map(function (transaccion) {
      let result = {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.products_categories.name,
        detail: `http://localhost:${Port}/api/products/${product.id}`,
      };
      return result;
    });

  }
};
