const express = require("express");
const router = express.Router();

module.exports = (tasks) => {
  router.post("/", (req, res) => {
    // Lógica para crear una nueva tarea
    const { id, description, completed } = req.body;
    const newTask = { id, description, completed };
    tasks.push(newTask);
    res.send("Nueva tarea creada");
  });

  router.delete("/:id", (req, res) => {
    // Lógica para eliminar una tarea por su ID
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
      res.send("Tarea eliminada correctamente");
    } else {
      res.status(404).send("Tarea no encontrada");
    }
  });

  router.put("/:id", (req, res) => {
    // Lógica para actualizar una tarea por su ID
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      res.send("Tarea actualizada correctamente");
    } else {
      res.status(404).send("Tarea no encontrada");
    }
  });

  return router;
};
