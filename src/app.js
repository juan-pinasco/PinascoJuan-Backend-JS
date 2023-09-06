import express from "express";
import session from "express-session";
import { __dirname } from "./utils.js";
const app = express();

app.use(
  session({
    secret: "desafioDeClase",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  req.session.papa = { conqueso: true };
  res.send("ok");
});

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});
