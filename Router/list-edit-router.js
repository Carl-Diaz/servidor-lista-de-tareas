const express = require("express");
const listEditRouter = express.Router();

listEditRouter.post("/", (req, res) => {
  const description = req.body.description;
  addTask(description);
  res.send("Tarea creada exitosamente.");
});

listEditRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  removeTask(id);
  res.send(`Tarea con ID ${id} eliminada.`);
});

listEditRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  completeTask(id);
  res.send(`Tarea con ID ${id} marcada como completada.`);
});

module.exports = listEditRouter;
