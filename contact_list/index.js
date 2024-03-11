const express = require("express");
const path = require("path");
const port = 8000;

const db = require('./config/mongoose');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded()); // used only for reading form data in structured format
app.use(express.static('assets'));

/*
Middleware functions are functions that have access to the request object (req), the response object (res), and the next
function in the application’s request-response cycle. The next function is a function in the Express router which, when
invoked, executes the middleware succeeding the current middleware
*/
// // custom middleware 1
// // the function has 3 param, req, res and next (this inform to invoke the next middleware/controller)
// app.use(function(req, res, next) {
//   req.Author = "Mayank Singh"
//   console.log('from middleware 1');
//   next();
// })

// // middleware 2
// // the Author property added in middleware 1 can be used in coming middleware / controller
// app.use(function(req, res, next){
//   console.log(`from middleware 2, Author : ${req.Author}`);
//   next();
// })


var contactsList = [
  {
    name: "Mr. Laurence Welch",
    number: "2790819497",
    email: "Skylar90@gmail.com",
  },
  {
    name: "Brenda Lesch",
    number: "915325653511",
    email: "Ruth_Gutkowski@gmail.com",
  },
  {
    name: "Emanuel Streich",
    number: "7667905887",
    email: "Josie51@gmail.com",
  }
];

//#region - Get Requests
app.get("/", function (req, res) {
  // res.send(`<h1>Home Page</h1>`)
  return res.render("home", { title: "My Contact List", contacts: contactsList });
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
  // return res.redirect('/contacts');
  return res.redirect('/');
});


// for deleting a contact
app.get("/deletecontact", function (req, res) {
  // get the query from the url
  const { number } = req.query;
  const contactIndex = contactsList.findIndex(contact => contact.number == number);
  if (contactIndex !== -1) contactsList.splice(contactIndex, 1);
  return res.redirect('back');
});

//#endregion - Post Requests

app.listen(port, function (error) {
  if (error) {
    console.log(`Error while running the server ${JSON.stringify(error)}`);
  }

  console.log(`Server is running on port ${port}`);
});
