const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "nimantha",
        password: "Nimantha123",
        database: "facerecognition",
    },
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send('it is working');
});

app.post("/register", (req, res) =>
    register.handleRegister(req, res, db, bcrypt)
);

app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));

app.put("/image", (req, res) => image.handleImage(req, res, db));

app.post("/image", (req, res) => image.handleApiCall(req, res));


app.listen(3000, () => console.log("App is running on port 3000"));

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
