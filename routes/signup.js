const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dbManager = require("../database/dbManager.js");

// tried converting to regular HTML and NOT EJS .... actually not sure what to put here....
router.get("/", function (req, res) {
  res.sendFile("signup.html");
});

//Save user info.
router.post("/create", async (req, res) => {
  await bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      throw err;
    }
    console.log("encrypting password");

    if (req.body.password != req.body.confirmPassword) {
      res.send({ passwordMismatch: true });
    }
    req.body.password = hash;
    req.body.confirmPassword = hash;

    dbManager.addUser(req.body).then((userExist) => {
      if (userExist) {
        res.send({
          passwordMismatch: false,
          success: false,
        });
      } else {
        res.send({ passwordMismatch: false, success: true });
      }
    });
  });
});

module.exports = router;

// Randy Lirano Review
// You should delete the file that you don't use.
// You have 2 files named Sign Up, the only difference is the upper and lower case.
// Even if you use both files, try to have a more descriptive name. I think this could benefit you as well to avoid typo or confusion.
