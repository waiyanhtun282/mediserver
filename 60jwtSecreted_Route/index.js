require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
(JwtStrategy = require("passport-jwt").Strategy),
  (ExtractJwt = require("passport-jwt").ExtractJwt);
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

let userMap = new Map();
userMap.set("aa@gmail.com", {
  name: "aa",
  email: "aa@gmail.com",
  password: "12345678",
});
userMap.set("bb@gmail.com", {
  name: "bb",
  email: "bb@gmail.com",
  password: "87654321",
});

//
let Strategy = new JwtStrategy(opts, function (jwt_payload, done) {
  let user = userMap.get(jwt_payload.email);
  if (user != null || user != undefined) {
    done(null, user);
  } else {
    done("No user with that email");
  }
});

// urluncode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
passport.use(Strategy);

app.post("/login", (req, res) => {
  // console.log(req)
  let email = req.body.email;
  let password = req.body.password;
  // console.log(`Email ${email} Password ${password}`);

  let user = userMap.get(email);
  if (user != null || user != undefined) {
    if (user.password == password) {
      //need paylaod jwt ***
      let payload = { email: email };
      let token = jwt.sign(payload, process.env.SECRET);

      res.json({ token: token });
    } else {
      res.send({ data: "Password Error is wrong" });
    }
  } else {
    res.send({ data: "Emaill Error is wrong" });
  }
});

app.get("/free", (req, res) => {
  res.send({ data: "Free Route" });
});

app.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ data: "secret Member Route" });
  }
);
app.listen(process.env.PORT, () =>
  console.log(`Sever is running ${process.env.PORT}`)
);
