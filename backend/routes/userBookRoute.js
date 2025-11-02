const express = require("express")
const router = express.Router()
const userBooksController = require("../controllers/userBookController")
const { availabilityMiddleware } = require("../middleware/availabilityMiddleware")

router.get("/", userBooksController.getAllUserBooks)

router.get("/:id", userBooksController.getUserBook)

router.post("/", availabilityMiddleware, userBooksController.createUserBook)

router.put("/:id", userBooksController.updateUserBook)

router.delete("/:id", userBooksController.deleteUserBook)
module.exports = router;