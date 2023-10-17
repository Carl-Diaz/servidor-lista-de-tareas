const express = require("express");
const { generateAccessToken, authenticateUser } = require("../auth");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = authenticateUser(username, password);

  if (!user) {
    return res.status(401).send("Credenciales incorrectas");
  }

  const accessToken = generateAccessToken(username);
  res.json({ accessToken });
});

module.exports = router;
