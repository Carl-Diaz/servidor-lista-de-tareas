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

// usa los rutas con las tareas
app.use(tasksRouter(tasks));
app.use("/list-edit", listEditRouter(tasks));

// Middleware para manejar métodos HTTP no permitidos
const handleInvalidHTTPMethods = (req, res, next) => {
  if (!["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
    return res.status(405).send("Método no permitido: Método HTTP no válido.");
  }

  next();
};

app.use(express.json());
app.use(handleInvalidHTTPMethods);
app.get("/", (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
