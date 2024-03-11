const express = require("express");
const path = require("path");
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

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

//#region - Get Requests
app.get("/", async function (req, res) {
  const contacts = await Contact.find({});
  return res.render("home", { title: "My Contact List", contacts: contacts });
});

app.get("/contacts", async function (req, res) {
  const contacts = await Contact.find({});
  return res.render("contacts", { contacts: contacts });
});

app.get("/addcontactform", function (req, res) {
  return res.render("addcontactform");
});

//#endregion - Get Requests

//#region - Post Requests
app.post("/addcontact", function (req, res) {
  Contact.create({
    ...req.body
  }).then((newContact) => {
    console.log(`added new contact to database ${JSON.stringify(newContact)}`);
    return res.redirect('back');
  }).catch((error) => {
    console.error(`add contact faced an error ${JSON.stringify(error)}`);
    return res.redirect('back');
  })
});


// for deleting a contact
app.get("/deletecontact", async function (req, res) {
  // get the query from the url
  const { id } = req.query;
  const resp = await Contact.deleteOne( { _id : id} );
  if (!resp.deletedCount) {
    console.error(`delete contact api faced an error ${JSON.stringify(resp)}`);
    return;
  }
  return res.redirect('back');
});

//#endregion - Post Requests

app.listen(port, function (error) {
  if (error) {
    console.log(`Error while running the server ${JSON.stringify(error)}`);
  }

  console.log(`Server is running on port ${port}`);
});
