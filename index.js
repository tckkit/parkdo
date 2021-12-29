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

// OrderService set up
const OrderService = require("./Services/OrderService");
const orderService = new OrderService(knex, axios);

// ListingService set up
const ListingService = require("./Services/ListingService");
const listingService = new ListingService(knex);

// ViewRouter set up
const ViewRouter = require("./Routers/ViewRouter");
const viewRouter = new ViewRouter(express, orderService);

// HistoryApiRouter set up
const HistoryApiRouter = require("./Routers/HistoryApiRouter");
const historyApiRouter = new HistoryApiRouter(express, orderService);

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
const parkingslotApiRouter = new ParkingslotApiRouter(
  express,
  parkingslotService
);

//==================================================================
// Create Renter Router & Service Set up
//==================================================================
const CreateRenter = require("./Services/CreateRenter");
const createRenter = new CreateRenter(knex, axios);
const RenterRouter = require("./Routers/RenterRouter");
const renterRouter = new RenterRouter(express, createRenter);
//==================================================================

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
// const { Passport } = require("passport");
app.engine("handlebars", engine());
// app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/", viewRouter.router());
app.use("/api/history", historyApiRouter.router());
app.use("/api/account", accountApiRouter.router());
app.use("/api/renter", renterRouter.router());
app.use("/api/parkingslot", parkingslotApiRouter.router());

https.createServer(options, app).listen(port, () => {
  console.log(`application listening to https://localhost:${port}`);
});
