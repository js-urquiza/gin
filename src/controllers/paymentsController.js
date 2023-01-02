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

  }

};
