const controller = require("../controllers/film.controller");

module.exports = (app) => {
  // GET all films
  app.get("/api/v1/films", controller);

  // GET film by ID
  app.get("/api/v1/films/:id", controller);

  // POST new film
  app.post("/api/v1/films", controller);

  // PUT updated film
  app.put("/api/v1/films/:id", controller);

  // Delete data user
  app.delete("/api/v1/films/:id", controller);
};
