import passport from "passport";
import userModel from "../dao/mongo/users/user.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { compareData } from "../utils.js";

passport.use(
  "Login",
  new LocalStrategy(async function (email, password, done) {
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      const isPasswordValid = await compareData(password, user.password);
      if (!isPasswordValid) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  new GithubStrategy(
    {
      clientID: "Iv1.28b2325675aab887",
      clientSecret: "38e2fdaf930b60928b221a898d9574c738281495",
      callbackURL: "http://localhost:8080/api/sessions/github",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const userDB = await userModel.findOne({ profile: profile.username });
        //login
        if (userDB) {
          /* if (userDB.fromGithub) {
            return done(null, userDB);
          } else { */
          return done(null, false);
          /* } */
        }
        //registro
        const newUser = {
          first_name: profile.displayName.split(" ")[0],
          last_name: profile.displayName.split(" ")[1],
          username: profile.username,
          password: " ",
          /* fromGithub: true, */
        };
        const result = await userModel.create(newUser);
        return done(null, result);
      } catch (error) {
        done(error);
      }
    }
  )
);

//user => id
passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

//id => user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
