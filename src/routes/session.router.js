import { Router } from "express";
import userModel from "../dao/mongo/users/user.js";

const router = Router();

router.post("/register", async (req, res) => {
  //clase tutor
  const { first_name, last_name, email, password } = req.body;
  const exist = await userModel.findOne({ email });
  if (exist) {
    return res
      .status(400)
      .send({ status: "error", error: "user already exist" });
  }
  const user = {
    first_name,
    last_name,
    email,
    password,
  };
  const result = await userModel.create(user);
  /* const result = await userModel.create(req.body); */
  res.send({ status: "success", payload: result });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //existe usuario?
  const user = await userModel.findOne({ email, password });
  if (!user)
    return res
      .status(400)
      .send({ status: "error", error: "Datos incorrectos" });
  // si existe el usuario crearle una sesion
  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
  };
  res.send({
    status: "success",
    payload: req.session.user,
    message: "Primer logueo!!!",
  }); //clase tutor
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
