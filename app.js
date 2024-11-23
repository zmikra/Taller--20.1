const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE ULTRA SECRETA";

// Aquí importamos los routers
const catsRouter = require("./routes/catRoute");

const app = express();
const port = 3000;

app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor de gatitos</h1>");
});

// Login de usuario (para obtener el token)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

// Middleware que autoriza a realizar peticiones a /cats
app.use("/cats", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

// Asociamos el router de gatos con la ruta /cats
app.use("/cats", catsRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
