const db = require("../database/models");

module.exports = {
  listForLandlord: async function (req, res) {
    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse,
      },
    });

    let propiedades = await db.Properties.findAll({
      where: {
        landlordId: req.session.landlordIdInUse,
      },
    });

    let smallNavConfig = {
      backBtn: "/landlords/dashboard/" + propietario.id,
      h1: req.session.loggedUser.name + " " + req.session.loggedUser.lastName,
      newBtn: "/properties/create",
      searchBtn: "",
    };

    res.render("propertiesForLandlord", {
      title: "Propiedades",
      smallNavConfig,
      propietario,
      propiedades,
    });
  },

  showCreate: async function (req, res) {
    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse,
      },
    });

    let smallNavConfig = {
      backBtn: "/landlords/dashboard/" + propietario.id,
      h1: req.session.loggedUser.name + " " + req.session.loggedUser.lastName,
      newBtn: "",
      searchBtn: "",
    };

    res.render("propertiesCreate", {
      title: "Nueva propiedad",
      smallNavConfig,
      propietario,
    });
  },

  create: async function (req, res) {
    await db.Properties.create({
      ...req.body,
      landlordId: req.session.landlordIdInUse,
      propertyPhoto: req.file ? req.file.filename : "defaultProperty.png",
    });

    res.redirect("/properties");
  },

  detail: async function(req, res) {
    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse,
      },
    });

    let propiedad = await db.Properties.findOne({
      where: {
        id: req.params.id
      },
    });

    let smallNavConfig = {
      backBtn: "/properties/",
      h1: req.session.loggedUser.name + " " + req.session.loggedUser.lastName,
      newBtn: "/properties/create",
      searchBtn: "",
    };

    res.render("propertyDetail", {
      title: 'Propiedad',
      smallNavConfig,
      propietario,
      propiedad,
    });
  },

  showEdit: async function(req, res) {
    let propietario = await db.Landlords.findOne({
      where: {
        id: req.session.landlordIdInUse,
      },
    });

    let propiedad = await db.Properties.findOne({
      where: {
        id: req.params.id,
      },
    });

    let smallNavConfig = {
      backBtn: "/properties/" + propiedad.id + '/detail',
      h1: req.session.loggedUser.name + " " + req.session.loggedUser.lastName,
      newBtn: "",
      searchBtn: "",
    };

    res.render("propertyEdit", {
      title: "Propiedad",
      smallNavConfig,
      propietario,
      propiedad,
    });
  },

  update: async function(req, res) {
    
    try {
      await db.Properties.update(
        {
          streetName: req.body.streetName,
          streetNumber: req.body.streetNumber,
          apartment: req.body.apartment,
          city: req.body.city,
          province: req.body.province,
          postalCode: req.body.postalCode,
          type: req.body.type,
          propertyPhoto: req.body.propertyPhoto
        },
        {where: {
          id: req.params.id
        }}
      )
    } catch (error) {
      console.log(error.message);
    }
    res.redirect('/properties/' + req.params.id + '/detail');
  },

  delete: async function(req, res) {
    await db.Properties.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect('/properties');
  }
  
};