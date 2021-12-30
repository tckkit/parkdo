// Express required modules
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// axios set up
const axios = require("axios");

// knex and .env
const env = require("dotenv");
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// HistoryService set up
const HistoryService = require("./Services/HistoryService");
const historyService = new HistoryService(knex, axios);

// HistoryApiRouter set up
const HistoryApiRouter = require("./Routers/HistoryApiRouter");
const historyApiRouter = new HistoryApiRouter(express, historyService);

// ViewRouter set up
const ViewRouter = require("./Routers/ViewRouter");
const viewRouter = new ViewRouter(express, historyService);

// AccountService set up
const AccountService = require("./Services/AccountService");
const accountService = new AccountService(knex, axios);

// AccountApiRouter set up
const AccountApiRouter = require("./Routers/AccountApiRouter");
const accountApiRouter = new AccountApiRouter(express, accountService);

// ParkingslotService set up
const ParkingslotService = require("./Services/ParkingslotService");
const parkingslotService = new ParkingslotService(knex, axios);

// ParkingslotRouter set up
const ParkingslotApiRouter = require("./Routers/ParkingslotApiRouter");
const parkingslotApiRouter = new ParkingslotApiRouter(express,parkingslotService);

// CreateRenter set up
const CreateRenter = require("./Services/CreateRenter");
const createRenter = new CreateRenter(knex, axios);
// RenterRouter set up
const RenterRouter = require("./Routers/RenterRouter");
const renterRouter = new RenterRouter(express, createRenter);

// ListingService set up
const ListingService  = require("./Services/ListingService");
const listingservice = new ListingService(knex, axios);
// ListingRouter set up
const ListingRouter = require("./Routers/ListingRouter");
const listingRouter = new ListingRouter(express, listingservice);

//https set up
const https = require("https");
const fs = require("fs");

const options = {
  cert: fs.readFileSync("./localhost.crt"),
  key: fs.readFileSync("./localhost.key"),
};

// Passport.js required modules
const session = require("express-session");
const setupPassport = require("./Services/PassportService");
const passportRouter = require("./Routers/PassportRouter")(express);
const port = process.env.PORT || 3000;
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
setupPassport(app);
app.use("/", passportRouter);

// Handlebars required modules
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Handlebars-helpers required modules
const hbs = require("express-handlebars");
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();

app.use("/", viewRouter.router());
app.use("/api/history", historyApiRouter.router());
app.use("/api/account", accountApiRouter.router());
app.use("/api/renter", renterRouter.router());
app.use("/api/parkingslot", parkingslotApiRouter.router());
app.use("/api/listing", listingRouter.router());

https.createServer(options, app).listen(port, () => {
  console.log(`application listening to https://localhost:${port}`);
});
