const dayjs = require("dayjs");
let db = require("../database/models");

module.exports = {

  currentDate: function() {
    let a = new Date();
    let b = dayjs(a).format("YYYY-MM-DD");
    
    return b;
  },

  currentDay: function() {
    let a = new Date;
    let b = dayjs(a).format('DD');

    return b;
  },

  currentMonth: function() {
    let a = new Date();
    let b = dayjs(a).format('MM');

    return b;
  },

  currentYear: function() {
    let a = new Date();
    let b = dayjs(a).format('YYYY');

    return b;
  },

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
          period: fechaVenc,
          name: "Alquiler",
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

  createPeriodicExpense: function (
    fecha,
    duracion,
    nombre,
    precio,
    coeficiente,
    contrato
  ) {
    let fechaInicio = new Date(fecha);
    let mesInicio = fechaInicio.getMonth() + 2; // new Date le saca 1 y getMonth le saca otro.
    let anioInicio = fechaInicio.getFullYear();

    for (i = 1; i <= duracion; i++) {
      if (mesInicio <= 12) {
        let fechaVencStr = anioInicio + "/" + mesInicio + "/" + 10;
        let fechaVenc = new Date(fechaVencStr);

        db.Transactions.create({
          contractId: contrato,
          period: fechaVenc,
          name: nombre,
          amount: precio,
          coeff: coeficiente,
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
      case 3: {
        let mes = "marzo";
        return mes;
      }
      case 4: {
        let mes = "abril";
        return mes;
      }
      case 5: {
        let mes = "mayo";
        return mes;
      }
      case 6: {
        let mes = "junio";
        return mes;
      }
      case 7: {
        let mes = "julio";
        return mes;
      }
      case 8: {
        let mes = "agosto";
        return mes;
      }
      case 9: {
        let mes = "septiembre";
        return mes;
      }
      case 10: {
        let mes = "octubre";
        return mes;
      }
      case 11: {
        let mes = "noviembre";
        return mes;
      }
      case 12: {
        let mes = "diciembre";
        return mes;
      }
    }
  },

  pesos: new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }),

  prueba: function () {
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
  },
};
