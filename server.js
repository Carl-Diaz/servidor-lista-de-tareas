// const express = require("express");
// const app = express();
// const port = 3000;
// const tasksRouter = require("./Routers/list-view-router");
// const listEditRouter = require("./Routers/list-edit-router");

// let tasks = [
//   { id: 1, description: "Hacer la compra", completed: false },
//   { id: 2, description: "Lavar la ropa", completed: true },
//   { id: 3, description: "Estudiar para el examen", completed: false },
// ];

// // usa los rutas con las tareas
// app.use(tasksRouter(tasks));
// app.use("/list-edit", listEditRouter(tasks));

// // Middleware para manejar métodos HTTP no permitidos
// const handleInvalidHTTPMethods = (req, res, next) => {
//   if (!["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
//     return res.status(405).send("Método no permitido: Método HTTP no válido.");
//   }

//   next();
// };

// app.use(express.json());
// app.use(handleInvalidHTTPMethods);
// app.get("/", (req, res) => {
//   res.json(tasks);
// });

// app.listen(port, () => {
//   console.log(`Servidor corriendo en el puerto: ${port}`);
// });

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const tasksRouter = require("./Routers/list-view-router");
const listEditRouter = require("./Routers/list-edit-router");
require("dotenv").config(); // Cargar variables de entorno

let tasks = [
  { id: 1, description: "Hacer la compra", completed: false },
  { id: 2, description: "Lavar la ropa", completed: true },
  { id: 3, description: "Estudiar para el examen", completed: false },
];

app.use(bodyParser.json()); // Middleware para parsear JSON

// Middleware para manejar métodos HTTP no permitidos
const handleInvalidHTTPMethods = (req, res, next) => {
  if (!["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
    return res.status(405).send("Método no permitido: Método HTTP no válido.");
  }

  next();
};

app.use(express.json());
app.use(handleInvalidHTTPMethods);

// Ruta de autenticación (POST /login)
app.post("/login", (req, res) => {
  // Simulación de autenticación de usuario
  const username = req.body.username;
  const password = req.body.password;

  // Verificar credenciales (esto debe ser más robusto en un entorno real)
  if (username === "usuario1" && password === "contraseña1") {
    const payload = { username: "usuario1" };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).send("Autenticación fallida");
  }
});

// Middleware para validar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Token no proporcionado");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Token inválido");
    }

    req.user = decoded;
    next();
  });
};

// Ruta protegida que requiere token JWT
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Ruta protegida exitosamente" });
});

// Usar rutas con las tareas
app.use(tasksRouter(tasks));
app.use("/list-edit", listEditRouter(tasks));

app.get("/", (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
