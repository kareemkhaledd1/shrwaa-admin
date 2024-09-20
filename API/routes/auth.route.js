const {
  getUsers,
  login,
  logout,
  register,
  getDelegateUsers,
  currentUser,
  updateUser,
  getUser,
  upload,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/verifyToken");
const route = require("express").Router();

route.get("/users", getUsers);
route.get("/user/:id", getUser);
route.get("/delegate-users", getDelegateUsers);
route.get("/current-user", currentUser);
route.post("/register", verifyToken, register);
route.post("/login", login);
route.post("/logout", logout);
route.put("/update/:id", upload.single("avatar"), updateUser);

module.exports = route;
