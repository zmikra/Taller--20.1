const express = require("express");
const catsRouter = express.Router();
const catController = require("../controllers/catController");

catsRouter.get("/", catController.getCats);
catsRouter.get("/:id", catController.getCatById);
catsRouter.post("/", catController.createCat);
catsRouter.put("/:id", catController.updateCat);
catsRouter.delete("/:id", catController.deleteCat);

module.exports = catsRouter;

