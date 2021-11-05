let express = require("express");
let router = express.Router();
// for login encryption
const bcrypt = require("bcrypt");

// for database connection
const dbManager = require("../database/dbManager.js");

// ------------------------------ROUTES-----------------------------------

/* GET home page. */
router.get("/", function (req, res) {
  res.sendFile("index.html");
});

// ----------INCOME ROUTES------------

/* FETCH POST incomePost*/
router.post("/incomePost", function (req, res) {
  console.log("ANONOMYOUS POST INCOME -- POST");
  res.status(200).send();
});

/* FETCH POST userIncomePost*/
router.post("/userIncomePost", async function (req, res) {
  console.log("USER POST INCOME -- POST");
  const loginInfo = req.body;
  try {
    dbManager.addIncomeInfo(loginInfo);

    const salary = loginInfo.salary;
    const state = loginInfo.state;
    const marital = loginInfo.marital;

    res.json(salary, marital, state);
  } catch (error) {
    console.log("Caught an error!", error);
    res.send(error);
  }
});

/* FETCH POST deleteUserIncome*/
router.post("/deleteUserIncome", async function (req, res) {
  console.log("USER DELETE INCOME -- POST");
  const loginInfo = req.body;
  try {
    dbManager.deleteIncomeInfo(loginInfo);

    res.send();
  } catch (error) {
    console.log("Caught an error!", error);
    res.send(error);
  }
});

// ----------LOGIN ROUTES------------
/* FETCH POST loginPost*/
router.post("/loginPost", async function (req, res) {
  const loginInfo = req.body;

  //check if username exists
  try {
    let record = await dbManager.findUser(loginInfo.username); //SHOULD THIS BE USERNAME OR USERID?

    bcrypt.compare(loginInfo.password, record.password, (err, result) => {
      if (result) {
        res.json(record);
      } else {
        res.json({ error: "Password does not match our records" });
      }
    });
  } catch (error) {
    console.log("Caught an error!", error);
    res.json({ error: "User not found" });
  }
});

// ----------ACTUAL CARD ITEM ROUTES------------

/* FETCH POST actualItemsPost*/
router.post("/actualItemsPost", async function (req, res) {
  console.log("ACTUAL ITEM CARD -- POST");
  const actualItem = req.body;

  try {
    let record = await dbManager.addActualItem(actualItem);
    res.json(record);
  } catch (error) {
    console.log("Caught an error!", error);
    res.send(error);
  }
});

/* FETCH POST actualItemsGet*/
router.post("/actualItemsGet", async function (req, res) {
  console.log("ACTUAL ITEM CARD -- GET");
  const user = req.body;

  try {
    let record = await dbManager.getActualItem(user);
    res.json(record);
  } catch (error) {
    console.log("Caught an error!", error);
    res.send(error);
  }
});

/* FETCH POST actualItemDelete*/
router.post("/actualItemDelete", async function (req, res) {
  console.log("ACTUAL ITEM DELETE -- POST");
  const userAndItem = req.body;

  try {
    let record = await dbManager.deleteActualItem(userAndItem);
    res.json(record);
  } catch (error) {
    console.log("Caught an error!", error);
    res.send(error);
  }
});

// ----------BUDGET CARD ITEM ROUTES------------

// Budget Item Post
router.post("/budgetItem/post", (req, res) => {
  console.log("BUDGET ITEM CARD -- POST");
  dbManager.addBudgetItem(req.body);
});

module.exports = router;
