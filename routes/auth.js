require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../model/helper");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn.js");
const selectByKey = require("./utils/selectByKey");

const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, marketing } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO users (firstname, lastname, email, password, marketing) VALUES 
		('${firstname}', '${lastname}', '${email}', '${hash}', ${marketing})`
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/guest", async (req, res) => {
  const { firstname, lastname, email } = req.body;
  try {
    await db(
      `INSERT INTO users (firstname, lastname, email, guest, marketing) VALUES 
		('${firstname}', '${lastname}', '${email}', 1, 0)`
    );
    res.send({ message: "Guest sucessfully successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await db(`SELECT * FROM users WHERE email = "${email}";`);
    const user = results.data[0];
    // const data = selectByKey("users", "email", email);
    // const user = data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      const token = jwt.sign({ user_id }, supersecret);
      res.send({
        message: "Login successful, here is your token",
        token,
        user: user,
      });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/profile", userShouldBeLoggedIn, async function (req, res, next) {
  //console.log(req.user_id);
  //const data = selectByKey("users", "id", req.user_id);
  const result = await db(`SELECT * FROM users WHERE id = ${req.user_id};`);
  console.log(result);
  res.send(result.data[0]);
});

module.exports = router;
