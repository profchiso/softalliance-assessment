//NPM modules
require("dotenv").config(); //require the config files
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitizer = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

//user defined modules
const { movieRouter } = require("./routes/movie");

// db connection
const { connectToDb } = require("./utils/dbcon");

connectToDb();

const app = express();
app.enable("trust proxy");

//middlewares

app.use(helmet()); //middleware to set security HTTP headers
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json({ limit: "100mb" })); //middleware for body-paser
app.use(express.urlencoded({ extended: true }));

app.use(cors()); //middle ware to allow cross origin resource sharing

//protect DB from NOSQL query injections using the express-mongo-sanitize middleware
// intercept the req.body, req.params, and req.query and remove malicious codes
app.use(mongoSanitizer());

//protect data from xss attack using the xss-clean middleware
// work on HTML to sanitize the data from malicious script
app.use(xss());

//protect against parameter pollution using the hpp middleware
//works on url parameters to sanitize it eg. remove duplicate parameters
app.use(hpp({ whitelist: [] })); // use the whitelist option to specify some parameter that you want to allow duplicate in the array

//a logger middleware to log requests
app.use((req, res, next) => {
  let payloadSize = req.headers["content-length"];
  console.log(`[Request Payload Size: ${payloadSize}]`);
  console.log(
    `[time: "${new Date().toISOString()}"  method: "${req.method}"   url: "${
      req.originalUrl
    }"  payload: "${JSON.stringify(req.body)}"  user-agent: "${
      req.headers["user-agent"]
    }"  ip: "${req.ip}"]`
  );
  next();
});

//routes
app.get("/api/v1", (req, res) => {
  res.json({
    statusCode: 200,
    statusText: "SUCCESS",
    data: {
      msg: `Welcome to Movie RESTful API    ${req.ip}`,
      resource: {},
    },
  });
});

//api routes
app.use("/api/v1/movies", movieRouter);

//catch undefined endpoints
app.use(undefinedrouter);

//spin up the server on the env port number
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`);
});
