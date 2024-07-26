import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";



const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// creating a session for data persistence 
app.use(session({
  secret:"topsecretmission",
  resave:false,
  saveUninitialized:true,
  cookie:{
    maxAge:1000 * 60 * 60 * 24
  }
  
}))
// after initializing session only 
app.use(passport.initialize())
app.use(passport.session())

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Omprakash@416",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/secret", (req, res) => {
  if (req.isAuthenticated()) {

    res.render("secrets.ejs");
  } else {
    res.redirect("/login")
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          // console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );

          const user = result.rows[0]
          req.login(user, (err) => {
            if (err) {

              console.error(err)
            }
            res.redirect("/secret")

          })

          // res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate('local', {
  successRedirect:"/secret",
  failureRedirect:"/login"
}), async (req, res) => {
  // req.user ==> is the user details we put in the strategy below a row of sql database

  
});

// logout of the session 
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/")
    }
  })
})


// new passport strategy 
passport.use(new Strategy(async function verify(username, password, cb) {

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            // res.render("secrets.ejs");
            return cb(null,user)
          } else {
            // res.send("Incorrect Password");
            return cb(null,false, {message:"Something went very wrong"})

          }
        }
      });
    } else {
      return cb(null,false, {message:"No user found"})

    }
  } catch (err) {
    console.log(err);
  }


}))

// to persist user information in login session or can say to store the info in local storage as cookies 
passport.serializeUser((user, cb) => {
  return cb(null, user)
})
passport.deserializeUser((user, cb) => {
  return cb(null, user)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
