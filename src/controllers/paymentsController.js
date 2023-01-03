const db = require("../database/models");
const aux = require("../utils/functions");

module.exports = {
  create: async function (req, res) {

    let mes = req.body.mes;
    let anio = req.body.anio;
    let periodo = anio + '-' + mes + '-' + 10;

    try {

      db.Transactions.create({
        contractId: req.session.contractIdInUse,
        date: new Date(aux.currentDate()),
        period: new Date(periodo),
        name: 'Pago',
        amount: -req.body.amount,
        coeff: 1,
        details: req.body.details
      })

    } catch (error) {
      console.log(error.message);
    }

    res.redirect("/payments/checkout");
  },

  checkout: async function(req, res) {

    try {
      
      let contract = await db.Contracts.findOne({
        where: {
          id: req.session.contractIdInUse,
        },
        include: ["landlord", "tenant", "property", "transactions"],
      });

      let transactions = contract.transactions;
      let pagos = transactions.filter(
        (transaction) => transaction.name == "Pago"
      );
      let ids = pagos.map((pago) => pago.id);
      let mayor = Math.max(...ids);
      let ultimoPago = pagos.find((pago) => pago.id == mayor);
      
      let periodo = new Date(ultimoPago.period);
      let mes = periodo.getMonth() + 1;
      let anio = periodo.getFullYear();

      let concepts = transactions.filter(transaction => transaction.period == ultimoPago.period);

      let paymentDate = new Date(ultimoPago.date);
      let paymentFullStringDate = aux.dateToFullString(paymentDate);

      let contractId = contract.id;

      let receipt = {
        paymentDate: ultimoPago.date,
        paymentDateString: paymentFullStringDate,
        tenantName: contract.tenant.name + ' ' + contract.tenant.lastName,
        amount: ultimoPago.amount * -1,
        propertyType: contract.property.type,
        propertyAdress: contract.property.streetName + ' ' + contract.property.streetNumber + ' ' + contract.property.apartment,
        propertyLocation: contract.property.city + ', ' + contract.property.province,
        periodMonth: mes,
        periodYear: anio,
        concepts: concepts
      };

      res.render('paymentReceipt' ,{
        title: 'Recibo',
        contractId,
        receipt
      });

    } catch (error) {
      console.log(error.message);
    }

  },

  whatsappNotification: async function(req, res) {
    
    try {
      
      let contract = await db.Contracts.findOne({
        where: {
          id: req.session.contractIdInUse,
        },
        include: ["landlord", "tenant", "property", "transactions"],
      });

      let transactions = contract.transactions;
      let concepts = transactions.filter(transaction => transaction.period == req.params.period);
      
      let periodo = new Date(req.params.period);
      let mes = periodo.getMonth() + 1;
      let anio = periodo.getFullYear();

      let montos = concepts.map((concept) => {
        return concept.amount / concept.coeff;
      });

      let total = montos.reduce(function (aux, monto) {
        return aux + monto;
      });

      function getDetail(concepts) {
        let acum = "";
        for (let i = 0; i < concepts.length; i++) {
          acum = acum + concepts[i].name + " " + aux.pesos.format(concepts[i].amount);
          if (concepts.length != i + 1) {
            acum = acum + ", ";
          } else {
            acum = acum + ".";
          }
        }
        return acum;
      };

      let data = {
        tenantName: contract.tenant.name + ' ' + contract.tenant.lastName,
        propertyType: contract.property.type,
        propertyAdress: contract.property.streetName + ' ' + contract.property.streetNumber + ' ' + contract.property.apartment,
        propertyLocation: contract.property.city + ', ' + contract.property.province,
        periodMonth: mes,
        periodYear: anio,
        total: total,
        detail: getDetail(concepts)
      };

      let message =
      "ALQUILER - _Recordatorio._ Estimada/o " +
      data.tenantName +
      ", este es el resumen correspondiente al mes " +
      data.periodMonth +
      " del año " +
      data.periodYear +
      ". El monto total a pagar es de " +
      aux.pesos.format(data.total) +
      ". (" +
      data.detail +
      ") . La presente liquidación vence el día 10 del corriente mes. La mora se computará de manera automática. _Mensaje generado automáticamente._";

      let whatsappNumber = contract.tenant.whatsapp;

      let whatsappLink = "https://wa.me/" + whatsappNumber + "?text=" + message;
      
      res.redirect(whatsappLink);

    } catch (error) {
      console.log(error.message);
    }

  }

};
