// ---- CRUD = Create, Read, Update, Delete ---- //

// Créer un livre
exports.createBook = (req, res, next) => {
    res.status(201).json({ message: "createBook OK" });
};

// Créer un rating pour un livre
exports.rateBook = (req, res, next) => {
    res.status(200).json({ message: "rateBook OK" });
};

// Récupérer toute la liste des livres
exports.getAllBooks = (req, res, next) => {
    res.status(200).json({ message: "getAllBooks OK" });
};

// Récupérer un livre spécifique
exports.getBookById = (req, res, next) => {
    res.status(200).json({ message: "getBookById OK" });
};

// Récupérer les livres par meilleur rating
exports.getBooksByBestRating = (req, res, next) => {
    res.status(200).json({ message: "getBooksByBestRating OK" });
};

// Update un livre
exports.updateBook = (req, res, next) => {
    res.status(200).json({ message: "updateBook OK" });
};

// Supprimer un livre
exports.deleteBook = (req, res, next) => {
    res.status(200).json({ message: "deleteBook OK" });
};
