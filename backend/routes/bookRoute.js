const express = require("express")
const router = express.Router()
const bookController = require("../controllers/booksController")
const { availabilityMiddleware } = require("../middleware/availabilityMiddleware")

//lire livre 
router.get("/", bookController.getAllBooks);

router.get("/:id", bookController.getBook);

//creer livre
router.post("/", bookController.createBook);

//modifier livre 
router.put("/:id", bookController.updateBook);

//supprimer livre
router.delete("/:id", availabilityMiddleware,bookController.deleteBook);

module.exports = router;