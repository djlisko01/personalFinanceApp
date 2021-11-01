const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// <<<<<<< HEAD
const dbManager = require("../database/dbManager.js");

router.get("/", function (req, res) {
  res.render("signUp");
});

//Save user info.
router.post("/create", async (req, res) => {
  console.log("at create");

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

// =======
//   const record = req.body;
//   console.log(record);
//   await UserLoginDB.create(record).catch((err) => {
//     res.send("ERROR");
//   });
//   res.redirect("/");
// });

// router.get("/getUser", async (req, res) => {
//   const record = await UserLoginDB.find({ userID: "cats" });
//   res.json(record);
// });

// Place to store user info - until we learn mongoDB.
// const users = require("../database/UserLoginDB.json");
// //Connect to the database
// mongoose.connect("mongodb://localhost/")

// // Add new user to database

// async function encryptPassword(user) {
//   console.log("encrpying password");
//   const salt = await bcrypt.genSalt();
//   user.password = await bcrypt.hash(user.password, salt);
// }

// router.post("/create", (req, res) => {
//   let user = req.body;

//   //Have to push the use a then b/c we have a promise.
//   encryptPassword(user).then(() => {
//     console.log("password encrypted.");
//     users.push(user);
//     fs.writeFile("../database/UserLoginDB.json", JSON.stringify(users), (err) => {
//       // Checking for errors
//       if (err) throw err;
//       console.log("Done writing"); // Success
//     });
//   });

//   res.redirect("/signUp");
// });

// >>>>>>> f3e9a73ed5ce94691c6f561a5174d6a1431a0815
module.exports = router;
