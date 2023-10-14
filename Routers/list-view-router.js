const express = require("express");
const router = express.Router();

module.exports = (tasks) => {
  router.get("/completas", (req, res) => {
    const completedTasks = tasks.filter((task) => task.completed);
    res.json(completedTasks);
  });

  router.get("/incompletas", (req, res) => {
    const incompleteTasks = tasks.filter((task) => !task.completed);
    res.json(incompleteTasks);
  });

  return router;
};
