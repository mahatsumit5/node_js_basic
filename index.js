import express from "express";
import path from "path";
import fs from "fs";
const _dirname = path.resolve();
const app = express();
const fn = _dirname + "/userList.csv";
const PORT = 8000;

// middleware
app.use(express.urlencoded());
// router,homepage

app.get("/register", (req, res) => {
  console.log("received request to home reouter");
  console.log(req.query);
  //   res.send("<h1>this is registration page</h1>");
  res.sendFile(_dirname + "/src/regForm.html");
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const str = `${email},${password}\n`;
  res.sendFile(_dirname + "/src/regForm.html");
  console.log(req.body);
  fs.appendFile(fn, str, (error) => {
    error ? console.log("error") : console.log("added to the file");
  });
  //   res.send("<h1>You have been registered</h1>");
});

//read file

app.get("/login", (req, res) => {
  //   console.log("received request to home router");
  res.sendFile(_dirname + "/src/login.html");

  //   res.send("<h1>This is login page</h1>");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const str = `${email},${password}`;
  //   res.sendFile(_dirname + "/src/login.html");

  fs.readFile(fn, (error, data) => {
    error && console.log(error.message);
    console.log(data.toString());
    const userStr = data.toString();
    const userArg = userStr.split("\n");
    if (userArg.includes(str)) {
      res.send("<h1>Login Successfull</h1>");
    } else {
      res.send("<h1>Invalid Password.Try Again</h1>");
    }
  });
  //   res.send("<h1>This is login page</h1>");
});

app.get("/", (req, res) => {
  console.log("received request to home reouter");
  res.send(`
  <a href="/"><Button>Home</Button></a>
  <a href="/register"><Button>Register</Button></a>
  <a href="/login"><Button>login</Button></a>
  
  <h1>This is home page</h1>`);
});
// make server availabel on http request

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server is up and running at:${PORT}`);
});
