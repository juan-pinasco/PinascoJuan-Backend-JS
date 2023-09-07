import { Router } from "express";
import userModel from "../dao/mongo/users/user.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, rol } = req.body;
  const exist = await userModel.findOne({ email });
  if (exist) {
    return res
      .status(400)
      .send({ status: "error", error: "user already exist" });
  }
  if (email === "adminCoder@coder.com") {
    const user = {
      first_name,
      last_name,
      email,
      password,
      rol: "admin",
    };
    const result = await userModel.create(user);
    res.send({ status: "success", payload: result });
  } else {
    const user = {
      first_name,
      last_name,
      email,
      password,
      rol: "user",
    };
    const result = await userModel.create(user);
    res.send({ status: "success", payload: result });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //existe usuario?
  const user = await userModel.findOne({ email, password });
  if (!user)
    return res
      .status(400)
      .send({ status: "error", error: "Datos incorrectos" });
  // si existe el usuario crearle una sesion y mandarle estas propiedades a profile
  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    rol: user.rol,
  };
  res.send({
    status: "success",
    payload: req.session.user,
    message: "Primer logueo!!!",
  });
  /* res.sendStatus(200); */
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(500)
        .send({ status: "error", error: "no pudo cerrar sesion" });
    res.redirect("/login");
  });
});

export default router;
