const manejarErroresListEditRouter = (req, res, next) => {
  if (req.method === "POST" && !req.body) {
    return res
      .status(400)
      .send("Solicitud incorrecta: Cuerpo de la solicitud vacío para POST.");
  }

  const { id, description, completed } = req.body;
  if (
    req.method === "POST" &&
    (!id || !description || completed === undefined)
  ) {
    return res
      .status(400)
      .send(
        "Solicitud incorrecta: Atributos inválidos o faltantes para crear tareas."
      );
  }

  if (req.method === "PUT" && !req.body) {
    return res
      .status(400)
      .send("Solicitud incorrecta: Cuerpo de la solicitud vacío para PUT.");
  }

  if (req.method === "PUT" && Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .send(
        "Solicitud incorrecta: Atributos inválidos o faltantes para actualizar tareas."
      );
  }

  next();
};

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

  // Aplicar el middleware de manejo de errores
  router.use(manejarErroresListEditRouter);

  return router;
};
