import path from "path";
import express from "express";
import hbs from "hbs";
import forecast from "./utils/forecast.js";

const __dirname = path.resolve();

const app = express();

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
    name: "Hussain",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Hussain",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "This is help text",
    name: "Hussain",
  });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send("You must provide an address");
  }
  const data = await forecast(req.query.address);
  res.send({
    City: data.location.name,
    Country: data.location.country,
    Forecast: data.current.weather_descriptions[0],
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

/////////////////////
app.get("/help/*", (req, res) => {
  res.render("page-404", {
    title: "404",
    name: "Hussain",
    text: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("page-404", {
    text: "Not found!",
    title: "404",
    name: "Hussain",
  });
});

////
app.listen(3000, () => {
  console.log("App.js started on port 3000");
});
