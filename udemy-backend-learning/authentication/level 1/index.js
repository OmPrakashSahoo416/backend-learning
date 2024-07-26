import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
import bcyrpt from "bcrypt"

const app = express();
const port = 3000;
const saltRounds = 10


// creating a post gress client to create a database instance and connect to it 
const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"secrets",
  password:"Omprakash@416",
  port:5432
})
db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});



app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  
  const checkList = await db.query("SELECT * FROM users WHERE email=$1", [email])
  console.log(email)

  if (checkList.rows.length > 0) {
    res.render("secrets.ejs", {email:email})

  } else {
    bcyrpt.hash(password,saltRounds, async (err, hash) => {

      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)",[email, hash])

      res.render("secrets.ejs", {email:email})
    })

  }

  // console.log(result)
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  const checkList = await db.query("SELECT * FROM users WHERE email=$1", [email])
  const emailExists = checkList.rows

  
    if (emailExists.length > 0) {
      const ismatch = await bcyrpt.compare(password, emailExists[0].password)
      if (ismatch) {
        res.render("secrets.ejs", {email:email})

      } else {
        res.render("login.ejs", {error:"Invalid credentials"})
      }

    } else {
      res.render("login.ejs", {error:"Invalid credentials"})
      // alert("No account found")

    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
