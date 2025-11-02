const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

//lire utilisateur 
router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

//creer utilisateur
router.post("/", userController.createUser);

//modifier utilisateur 
router.put("/:id", userController.updateUser);

//supprimer utilisateur
router.delete("/:id", userController.deleteUser);

module.exports = router;