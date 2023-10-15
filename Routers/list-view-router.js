const manejarErroresListViewRouter = (req, res, next) => {
  const parametrosValidos = ["completas", "incompletas"];
  const parametro = req.params[0];

  if (!parametrosValidos.includes(parametro)) {
    return res.status(400).send("Solicitud incorrecta: Parámetro inválido.");
  }

  next();
};

module.exports = (tasks) => {
  router.get("/completas", (req, res) => {
    const completedTasks = tasks.filter((task) => task.completed);
    res.json(completedTasks);
  });

  router.get("/incompletas", (req, res) => {
    const incompleteTasks = tasks.filter((task) => !task.completed);
    res.json(incompleteTasks);
  });

  // Aplicar el middleware de manejo de errores
  router.param(0, manejarErroresListViewRouter);

  return router;
};
