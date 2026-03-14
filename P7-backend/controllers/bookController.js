const Book = require("../models/Book");
const fs = require("fs");

// Créer un livre
exports.createBook = (req, res, next) => {
    const bookData = JSON.parse(req.body.book);
    const ratings = bookData.ratings || [];
    const averageRating =
        ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.grade, 0) / ratings.length
            : 0;

    const book = new Book({
        ...bookData,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        ratings: ratings,
        averageRating: averageRating,
    });
    book.save()
        .then(() => res.status(201).json({ message: "Livre créé !" }))
        .catch((error) => res.status(400).json({ error }));
};

// Créer un rating pour un livre
exports.rateBook = (req, res, next) => {
    const { userId, rating } = req.body;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (!book)
                return res.status(404).json({ message: "Livre non trouvé" });

            // Vérifier si l'utilisateur a déjà noté
            const alreadyRated = book.ratings.find(
                (r) => r.userId.toString() === userId,
            );
            if (alreadyRated) {
                return res
                    .status(400)
                    .json({ message: "Vous avez déjà noté ce livre" });
            }

            book.ratings.push({ userId, grade: rating });

            // Calculer la moyenne
            const total = book.ratings.reduce((sum, r) => sum + r.grade, 0);
            book.averageRating = total / book.ratings.length;

            book.save()
                .then((updatedBook) => res.status(200).json(updatedBook))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// Récupérer toute la liste des livres
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(500).json({ error }));
};

// Récupérer un livre spécifique
exports.getBookById = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(404).json({ error }));
};

// Récupérer les livres par meilleur rating
exports.getBooksByBestRating = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1 })
        .limit(3)
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(500).json({ error }));
};

// Update un livre
exports.updateBook = (req, res, next) => {
    const bookData = req.file
        ? {
              ...JSON.parse(req.body.book),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          }
        : { ...req.body };

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId.toString() !== req.auth.userId) {
                return res.status(401).json({ message: "Non autorisé" });
            }
            // Supprimer l'ancienne image si nouvelle image uploadée
            if (req.file) {
                const filename = book.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) console.error(err);
                });
            }
            Book.updateOne(
                { _id: req.params.id },
                { ...bookData, _id: req.params.id },
            )
                .then(() =>
                    res.status(200).json({ message: "Livre modifié !" }),
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// Supprimer un livre
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId.toString() !== req.auth.userId) {
                return res.status(401).json({ message: "Non autorisé" });
            }
            const filename = book.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: "Livre supprimé !" }),
                    )
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};
