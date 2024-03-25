const { body } = require('express-validator');
const { User } = require('../database/models');

exports.validateLogin = [
    body('email')
        .notEmpty().withMessage('Debe ingresar el email').bail()
        .isEmail().withMessage('Debe ingresar un email valido'),
    body('password')
        .notEmpty().withMessage('Debe ingresar la contraseña.')
]


exports.validateUser = [
    body('first_name')
        .trim()
        .notEmpty().withMessage('Debe ingresar su Nombre.').bail()
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('No debe ingresar numeros.').bail()
        .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 letras."),
    body('last_name')
        .trim()
        .notEmpty().withMessage('Debe ingresar su Apellido.').bail()
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('No debe ingresar numeros')
        .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 letras."),
    body('address')
        .trim()
        .notEmpty().withMessage('Debe ingresar su domicilio.').bail()
        .isAlphanumeric('es-ES', { ignore: ' ' }).withMessage('No debe ingresar solo numeros'),
    body('email')
        .notEmpty().withMessage('Debe ingresar el email').bail()
        .isEmail().withMessage('Debe ingresar un email valido')
        .custom(async (value) => {
            const userExist = await User.findOne({
                where: {
                    email: value
                }
            });
            if (userExist) {
                throw new Error('El email ingresado ya está registrado')
            };

            return true;
        }),
    body('avatar')
        .custom((value, { req }) => {
            if (req.file === undefined)
                throw new Error('Tiene que cargar una imagen de avatar.');

            if (
                req.file.mimetype === 'image/jpeg' ||
                req.file.mimetype === 'image/png' ||
                req.file.mimetype === 'image/jpg'
            ) {
                return true;
            }
            else {

                throw new Error('El archivo debe ser una imagen JPEG, PNG o JPG.');
            }
        })
];

exports.validateUpdate = [
    body('first_name')
        .trim()
        .notEmpty().withMessage('Debe ingresar su Nombre.').bail()
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('No debe ingresar numeros').bail()
        .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 letras."),
    body('last_name')
        .trim()
        .notEmpty().withMessage('Debe ingresar su Apellido.').bail()
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('No debe ingresar numeros')
        .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 letras."),
    body('address')
        .notEmpty().withMessage('Debe ingresar su domicilio.').bail()
        .isString().withMessage('No debe ingresar numeros'),
    body('email')
        .notEmpty().withMessage('Debe ingresar el email').bail()
        .isEmail().withMessage('Debe ingresar un email valido'),
    body('avatar')
        .custom((value, { req }) => {
            if (req.file === undefined)
                return true;
            if (
                req.file.mimetype === 'image/jpeg' ||
                req.file.mimetype === 'image/png' ||
                req.file.mimetype === 'image/jpg'
            ) {
                return true;
            }
            else {

                throw new Error('El archivo debe ser una imagen JPEG, PNG o JPG.');
            }
        })
];

exports.validatePassword = [
    body('password')
        .notEmpty().withMessage('Debe ingresar la contraseña.')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false, // Deshabilitar el retorno de puntaje
            pointsPerUnique: 1,
            pointsPerRepeat: 0,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10
        })
        .withMessage('La contraseña no cumple con los requisitos de seguridad'),
    body('confirm_password')
        .notEmpty().withMessage('Debe ingresar la contraseña.').bail()
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            };
            return true;
        }),
]