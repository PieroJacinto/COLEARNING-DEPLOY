const { User } = require("../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");
const salt = 10;
const { validationResult } = require("express-validator");
const { saveImage } = require("../middlewares/userMulterMemoryMiddleware");
const fs = require("fs");

const path = require("path");

const userController = {
  register: (req, res) => {
    res.render("./users/register");
  },
  processRegister: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("./users/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
    const nombreArchivo = saveImage(req.file);

    if (!nombreArchivo)
      return res.render("./users/register", {
        //errors: errors.mapped(),
        old: req.body,
      });

    delete req.body.confirm_password;
    const { first_name, last_name, email, password, address } = req.body;

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: bcrypt.hashSync(password, salt),
      status: 1,
      image: nombreArchivo,
      address,
      profile_id: 3,
    });

    return res.redirect("/users/login");
  },
  login: (_, res) => {
    res.render("./users/login");
  },
  profile: (req, res) => {
    const user = req.session.userLogged;
    if (user === undefined) res.redirect("../not-found");
    res.render("./users/profile", { user });
  },
  edit: (req, res) => {
    const user = req.session.userLogged;
    if (user === undefined) res.redirect("../not-found");
    res.render("./users/editProfile", { user });
  },
  processLogin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("./users/login", {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: { [Op.like]: `${email}` },
        status: 1,
      },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "password",
        "image",
        "address",
        "profile_id",
      ],
    });

    if (!user)
      return res.render("./users/login", {
        errors: {
          msg: "Credenciales incorrectas.",
        },
        old: req.body,
      });

    const userIsValidPassword = bcrypt.compareSync(password, user.password);

    // console.log(bcrypt.hashSync("admin1234", salt));
    if (!userIsValidPassword)
      return res.render("./users/login", {
        errors: {
          msg: "Credenciales incorrectas.",
        },
        old: req.body,
      });

    const userJson = user.get({ plain: true });
    delete userJson.password;

    req.session.userLogged = userJson;
    if (req.body.rememberMe) {
      res.cookie("userEmail", email, { maxAge: 1000 * 60 * 60 });
    }

    return res.redirect(`profile`);
  },
  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("./users/editProfile", {
        errors: errors.mapped(),
        old: req.body,
        user: null,
      });
    }

    const userId = req.session.userLogged.id;
    const userBody = req.body;
    const user = await User.findByPk(userId);
    if (userBody.oldPassword && userBody.password) {
      const passwordValidation = bcrypt.compareSync(
        userBody.oldPassword,
        user.password
      );
      if (user.password) {
        if (!passwordValidation) {
          return res.render("./users/editProfile", {
            errors: {
              msg: "Contraseña incorrecta",
            },
            old: req.body,
            user: null,
          });
        }else{
          user.password = bcrypt.hashSync(userBody.password, 10);
        }
      }
    }


    if (req.file != undefined) {
      const nombreArchivo = saveImage(req.file);
      if (!nombreArchivo) return res.redirect("/users/edit");
      const avatarAnterior = req.session.userLogged.image;
      user.image = nombreArchivo;
      try {
        fs.unlinkSync(
          path.join(__dirname, "../../public/img/users", avatarAnterior)
        );
      } catch (error) {
        console.log("Error:", error);
      }
    }

    user.first_name = userBody.first_name;
    user.last_name = userBody.last_name;
    user.email = userBody.email;
    user.address = userBody.address;
    await user.save();

    const userJson = await user.get({ plain: true });
    delete userJson.password;

    req.session.userLogged = userJson;
    if (req.cookies.userEmail) {
      res.clearCookie("userEmail");
      res.cookie("userEmail", userJson.email, { maxAge: 1000 * 60 * 60 });
    }
    res.redirect("/users/profile");
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userEmail");
    res.redirect("/");
  },
  delete: async (req, res) => {
    try {
      const id = req.session.userLogged.id;
      const userDeleted = await User.findByPk(id);
      console.log(userDeleted);
      let img
      if (userDeleted) {
        img = userDeleted.image
        userDeleted.destroy();
        req.session.destroy();
        res.clearCookie("userEmail");
        fs.unlinkSync(path.join(__dirname, "../../public/img/users", img));
        console.log("Usuario eliminado", userDeleted);
        return res.redirect("/users/login");
      }
      return res.redirect("/");
    } catch (error) {
      console.log(error);
      return res.redirect("/");
    }
  },

};

module.exports = userController;
