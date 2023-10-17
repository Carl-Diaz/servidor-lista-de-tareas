const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = [
  { id: 1, username: "usuario1", password: "password1" },
  { id: 2, username: "usuario2", password: "password2" },
  { id: 3, username: "usuario3", password: "password3" },
  // Agrega más usuarios si es necesario
];

const generateAccessToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "30m" });
};

const authenticateUser = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password
  );
};

module.exports = { generateAccessToken, authenticateUser };
