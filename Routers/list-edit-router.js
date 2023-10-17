const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Token no proporcionado");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send("Token no válido");
  }
};

router.get("/protected-route", verifyToken, (req, res) => {
  res.send("Ruta protegida, acceso concedido");
});

module.exports = router;
