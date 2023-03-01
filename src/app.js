import path from "path";
import express from "express";
import hbs from "hbs";

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "templates/views");
const partialsPath = path.join(__dirname, "templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Ghulam Hussain",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ghulam Hussain",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "This is help text",
    name: "Ghulam Hussain",
  });
});

/////////////////////
app.get("/help/*", (req, res) => {
  res.render("page-404", {
    title: "404",
    name: "Ghulam Hussain",
    text: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("page-404", {
    text: "Not found!",
    title: "404",
    name: "Ghulam Hussain",
  });
});

////
app.listen(port, () => {
  console.log("App.js started on port" + port);
});
