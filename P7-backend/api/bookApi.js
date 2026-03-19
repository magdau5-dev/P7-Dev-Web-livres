const express = require("express");
//import express from "express";
const router = express.Router();

const auth = require("../middleware/auth");
const { uploadImage, compressImage } = require("../middleware/multer-config");
const bookController = require("../controllers/bookController");

// ---- CRUD = Create, Read, Update, Delete ---- //

// Créer un livre
router.post("/", auth, uploadImage, compressImage, bookController.createBook);

// Créer un rating pour un livre
router.post("/:id/rating", auth, bookController.rateBook);

// Récupérer toute la liste des livres
router.get("/", bookController.getAllBooks);

// Récupérer les livres par meilleur rating
router.get("/bestrating", bookController.getBooksByBestRating);

// Récupérer un livre spécifique
router.get("/:id", bookController.getBookById);

// Update un livre
router.put("/:id", auth, uploadImage, compressImage, bookController.updateBook);

// Supprimer un livre
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
