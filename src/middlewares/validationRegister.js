const { body } = require("express-validator");

const userRegisterValidation = [
  body("email")
    .notEmpty()
    .withMessage("El campo email no puede quedar vacío.")
    .bail()
    .isEmail()
    .withMessage("El email debe tener un formato válido."),
  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede quedar vacía.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
  body("name")
    .notEmpty()
    .withMessage("Debe completar su nombre.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres."),
  body("lastName")
    .notEmpty()
    .withMessage("Debe completar su apellido.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres."),
  body("birthDate")
    .notEmpty()
    .withMessage("Debe completar su fecha de nacimiento."),
];

module.exports = userRegisterValidation;
