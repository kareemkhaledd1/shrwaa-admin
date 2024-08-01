const {
  getUsers,
  login,
  logout,
  register,
} = require("../controllers/auth.controller");
const route = require("express").Router();

route.get("/", getUsers);
route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);

module.exports = route;
