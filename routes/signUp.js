const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dbManager = require("../database/dbManager.js");

// console.log(userLoginInfo);
// console.log(mongoose.model("UserLoginInfo")); //How I named the model

//

/* Renders the signUp page*/
router.get("/", function (req, res) {
  res.render("signUp");
});

//Save user info.
router.post("/create", async (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      throw err;
    }
    console.log("encrypting password");
    req.body.password = hash;

    dbManager.addUser(req.body).then((userExist) => {
      console.log(userExist);
      if (userExist) {
        res.send("User exists? True");
      } else {
        res.redirect("/");
      }
    });
  });
});

module.exports = router;
