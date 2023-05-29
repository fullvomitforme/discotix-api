const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

module.exports = (app) => {
  // GET all users
  app.get("/api/v1/users", controller.getAllUser);

  // GET user by ID
  app.get("/api/v1/users/:id", controller.getUserById);

  // POST new user
  app.post("/api/v1/users", controller.createUser);

  // POST login user
  app.post("/api/v1/login", controller.loginUser);

  // GET setting user
  app.get("/api/v1/setting", auth.verifyToken, controller.settingUser);

  // PUT updated user
  app.put("/api/v1/users/:id", controller.updateUser);

  // Delete data user
  app.delete("/api/v1/users/:id", controller.deleteUser);
};
