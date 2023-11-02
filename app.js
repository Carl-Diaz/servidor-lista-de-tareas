const express = require("express");
const app = express();
const port = 3000;
const tasksRouter = require("./Routers/list-view-router");
const listEditRouter = require("./Routers/list-edit-router");

app.use(express.json());

let tasks = [
  // Define 'tasks' and initialize it with initial values
  { id: 1, description: "Hacer la compra", completed: false },
  { id: 2, description: "Lavar la ropa", completed: true },
  { id: 3, description: "Estudiar para el examen", completed: false },
];

// Use the routers with the tasks
app.use(tasksRouter(tasks));
app.use("/list-edit", listEditRouter(tasks));

app.get("/", (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
