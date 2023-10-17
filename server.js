const express = require("express");
const app = express();
const port = 3000;
const tasksRouter = require("./Routers/list-view-router");
const listEditRouter = require("./Routers/list-edit-router");

let tasks = [
  { id: 1, description: "Hacer la compra", completed: false },
  { id: 2, description: "Lavar la ropa", completed: true },
  { id: 3, description: "Estudiar para el examen", completed: false },
];

app.use("/list-view", tasksRouter);
app.use("/list-edit", listEditRouter);
app.use(express.json());

// Middleware para manejar métodos HTTP no permitidos
const handleInvalidHTTPMethods = (req, res, next) => {
  if (!["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
    return res.status(405).send("Método no permitido: Método HTTP no válido.");
  }
  next();
};
app.use(handleInvalidHTTPMethods);

// Crear una nueva tarea
app.post("/tasks", (req, res) => {
  const { description, completed } = req.body;
  const newTask = { id: tasks.length + 1, description, completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar una tarea
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { description, completed } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], description, completed };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).send("Tarea no encontrada");
  }
});

// Eliminar una tarea
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.sendStatus(204);
});

// Listar todas las tareas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Listar tareas completas
app.get("/tasks/completed", (req, res) => {
  const completedTasks = tasks.filter((task) => task.completed);
  res.json(completedTasks);
});

// Listar tareas incompletas
app.get("/tasks/incomplete", (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  res.json(incompleteTasks);
});

// Obtener una sola tarea
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send("Tarea no encontrada");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
