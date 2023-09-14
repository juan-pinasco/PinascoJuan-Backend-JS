import { Router } from "express";
import userModel from "../dao/mongo/users/user.js";
import { hashData } from "../utils.js";
import { compareData } from "../utils.js";
import passport from "passport";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, username, email, password, rol } = req.body;
  const exist = await userModel.findOne({ username, email });
  if (exist) {
    return res
      .status(400)
      .send({ status: "error", error: "user already exist" });
  }
  if (email === "adminCoder@coder.com") {
    const user = {
      first_name,
      last_name,
      username,
      email,
      password,
      rol: "admin",
    };
    const hashPassword = await hashData(password);
    const result = await userModel.create({ ...user, password: hashPassword });
    //const result = await userModel.create(user)
    res.send({ status: "success", payload: result });
  } else {
    const user = {
      first_name,
      last_name,
      username,
      email,
      password,
      rol: "user",
    };
    const hashPassword = await hashData(password);
    const result = await userModel.create({ ...user, password: hashPassword });
    //const result = await userModel.create(user);
    res.send({ status: "success", payload: result });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //existe usuario?
  /* const user = await userModel.findOne({ email, password }); */
  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(400).send({
      status: "error",
      error: "Datos incorrectos, registrate por favor",
    });
  //si existe el usuario comparale la contraseña hasheada
  const isPasswordValid = await compareData(password, user.password);
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "username or password not valid" });
  }
  // si al comparar contraseña del usuario es valida, crearle una sesion y mandarle estas propiedades a profile
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

//passport github
router.get(
  "/githubSignup",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github", passport.authenticate("github"), async (req, res) => {
  console.log(req);
  res.send("bienvenido desde github");
});
//finaliza passport github

//
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
