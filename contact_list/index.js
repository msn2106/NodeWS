const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

const contactsList = [
  {
    name: "Mr. Laurence Welch",
    number: "+91 2790-819-497",
    email: "Skylar90@gmail.com",
  },
  {
    name: "Brenda Lesch",
    number: "+91 5325-653-511",
    email: "Ruth_Gutkowski@gmail.com",
  },
  {
    name: "Emanuel Streich",
    number: "+91 7667-905-887",
    email: "Josie51@gmail.com",
  }
];

//#region - Get Requests
app.get("/", function (req, res) {
  // res.send(`<h1>Home Page</h1>`)
  return res.render("home", { title: "My Contact List" });
});

app.get("/contacts", function (req, res) {
  return res.render("contacts", { contacts: contactsList });
});

app.get("/addcontactform", function (req, res) {
  return res.render("addcontactform");
});

//#endregion - Get Requests

//#region - Post Requests
app.post("/addcontact", function (req, res) {
  // contactsList.push({
  //   name: req.body.name,
  //   number: req.body.number,
  //   email : req.body.email
  // })
  contactsList.push(req.body)
  return res.redirect('/contacts');
});

app.post("/deletecontact", function (req, res) {
  contactsList = contactsList.filter(x => x.number !== req.body.number)
  return res.redirect('/contacts');
});

//#endregion - Post Requests

app.listen(port, function (error) {
  if (error) {
    console.log(`Error while running the server ${JSON.stringify(error)}`);
  }

  console.log(`Server is running on port ${port}`);
});
