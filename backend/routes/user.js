const express = require("express");
const router = express.Router(); //Permet de créer un router express
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
