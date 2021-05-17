const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json());

//sync db; enables Sequelize to automatically create the table according model definition
//options: force  - can force table to drop and resync
const db = require("./app/models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("drop and re-sync db");
});

// get all routes
let ApiTutorialRoutes = require("./app/routes/tutorial.routes");
let IndexRoutes = require("./app/routes/index.routes");
let UserRoutes = require("./app/routes/user.routes");
// index routes
app.use("/", IndexRoutes);
// tutorial routes
app.use("/api/tutorials", ApiTutorialRoutes);
// user routes
app.use("/api/users", UserRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  try {
    await db.sequelize.authenticate();
    console.log(
      "---------Connection with Postgres has been established successfully.------"
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
