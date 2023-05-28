const controller = require("../controllers/user.controller");

module.exports = (app) => {
  app.get("/api/v1/users", controller.getAllUser);
  app.get("/api/v1/users/:id", controller.getUserById);
  app.post("/api/v1/users", controller.createUser);
  app.put("/api/v1/users/:id", controller.updateUser);
  app.delete("/api/v1/users/:id", controller.deleteUser);
};
