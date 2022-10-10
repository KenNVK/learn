const { response } = require("express");
const express = require("express");
const router = express.Router();
const playerController = require("../app/controllers/PlayerController");

//Getting all
router.get("/all", playerController.all);

// //Getting one
router.get("/:slug", playerController.one);

//Creating one
router.post("/create", playerController.create);

//Updating one
router.put("/update/id", playerController.update);

//Deleting one
router.delete("/delete/id", playerController.delete);

module.exports = router;
