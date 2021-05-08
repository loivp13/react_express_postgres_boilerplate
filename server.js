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
const TutorialController = require("./app/controllers/tutorial.controller");
const TagController = require("./app/controllers/tag.controller");
const CommentController = require("./app/controllers/comments.controller");

const run = async () => {
  const tut1 = await TutorialController.create({
    title: "Tut#1",
    description: "Tut#1 Description",
  });
  const tut2 = await TutorialController.create({
    title: "Tut#2",
    description: "Tut#2 Description",
  });

  const tut3 = await TutorialController.create({
    title: "Tut#3",
    description: "Tut#3 Description",
  });

  const tut4 = await TutorialController.create({
    title: "Tut#4",
    description: "Tut#4 Description",
  });

  const tag1 = await TagController.create({
    name: "Tag#1",
  });

  const tag2 = await TagController.create({
    name: "Tag#2",
  });

  await TagController.addTutorial(tag1.id, tut1.id);
  // >> added Tutorial id=1 to Tag id=1

  await TagController.addTutorial(tag1.id, tut2.id);
  // >> added Tutorial id=2 to Tag id=1

  await TagController.addTutorial(tag1.id, tut3.id);
  // >> added Tutorial id=3 to Tag id=1

  await TagController.addTutorial(tag2.id, tut3.id);
  // >> added Tutorial id=3 to Tag id=2

  await TagController.addTutorial(tag2.id, tut4.id);
  // >> added Tutorial id=4 to Tag id=2

  await TagController.addTutorial(tag2.id, tut1.id);
  // >> added Tutorial id=1 to Tag id=2const _tag1 = await TagController.findById(tag1.id);
  console.log(">> tag1", JSON.stringify(_tag1, null, 2));
  const tags = await TagController.findAll();
  console.log(">> tags", JSON.stringify(tags, null, 2));
  const _tut = await TutorialController.findById(tut3.id);
  console.log(">> tut3", JSON.stringify(_tut, null, 2));
};

db.sequelize.sync({ force: true }).then(() => {
  console.log("drop and re-sync db");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
