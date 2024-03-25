const db = require("../../database/models");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const Op = Sequelize.Op;
const User = db.User;
const Profile = db.Profile

const userApiController = {
  getAll: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "first_name", "last_name", "email"],
      });
      const newUsers = users.map((user) => {
        return {
          id: user.id,
          name: user.first_name + " " + user.last_name,
          email: user.email,
          detail: `http://localhost:3010/api/users/${user.id}`,
        };
      });
      res.json({
        count: users.length,
        users: newUsers,
      });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
  findOne: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await User.findOne({
        where: { id: id },
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "image",
          "address",
        ],
        include:{ model: Profile, attributes: ['id','name']}
      });
      console.log(user.Profile.name);
      if(user){
      res.json({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        image: `http://localhost:3010/img/users/${user.image}`,
        address: user.address,
        profile: user.Profile.name
      })}
      else{
        res.json({user:'Not Found'})
      }
    } catch (error) {
      res.send({ error: error });
    }
  },
  validate: async (req, res) => {
    try {
      const email = req.params.email;

      const respuesta = await User.findOne({
        where: { email: email },
      });

      if (respuesta) {
        res.json({
          noExiste: false,
        });
      } else {
        res.json({
          noExiste: true,
        });
      }
    } catch (error) {
      res.send({ error: error });
    }
  },
  login: async (req, res) => {

    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({
      where: {
        email: { [Op.like]: `${email}` },
        status: 1,
        profile_id: 1
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
    console.log(user);
    if (!user){
     res.json({user:'Not Found'})
    }else{

    const userIsValidPassword = bcrypt.compareSync(password, user.password);
    console.log(userIsValidPassword);
    // console.log(bcrypt.hashSync("admin1234", salt));
    if (!userIsValidPassword){
      console.log('entro por el !userisValidPassword');
      res.json({user:'Not password'})
    }else{

    const userJson = user.get({ plain: true });
    delete userJson.password;

    // req.session.userLogged = userJson;

    return res.json(userJson)}}
  }
};

module.exports = userApiController;
