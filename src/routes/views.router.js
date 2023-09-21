import { Router } from "express";
import userModel from "../dao/mongo/users/user.js"; // agregado recien

const router = Router();

const publicAcces = (req, res, next) => {
  if (req.session.user) return res.redirect("/profile");
  next();
};

const privateAcces = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login");
  next();
};

router.get("/register", publicAcces, (req, res) => {
  res.render("register");
});

router.get("/login", publicAcces, (req, res) => {
  res.render("login");
});

router.get("/profile", (req, res) => {
  /* console.log(req.session.passport.user); */
  res.render("profile", {
    /* user: req.session.user, */
    user: req.session.passport.user,
  });
});

/* router.get("/profile", (req, res) => {
  const { user } = req.session.passport;
  const userDB = userModel.findById(user);
 console.log(userDB); 
  res.render("profile");
}); */

/* router.get(
  "/profile",
  privateAcces, (req, res) => {
    res.render(
      "profile" , {
      user: req.session.user,
    }
    );
  }
); */

/* router.get("/profile", async (req, res) => {
  const { user } = req.session.user;
  const userDB = await userModel.findById(user);
  console.log(userDB);
  res.render("profile");
});
 */
export default router;
