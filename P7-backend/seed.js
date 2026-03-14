require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/Book");

const books = [
    {
        userId: new mongoose.Types.ObjectId(),
        title: "Milwaukee Mission",
        author: "Elder Cooper",
        imageUrl: "http://localhost:4000/images/livre1.jpg",
        year: 2021,
        genre: "Policier",
        ratings: [{ userId: new mongoose.Types.ObjectId(), grade: 5 }],
        averageRating: 3,
    },
    {
        userId: new mongoose.Types.ObjectId(),
        title: "Book for Esther",
        author: "Alabaster",
        imageUrl: "http://localhost:4000/images/livre2.jpg",
        year: 2022,
        genre: "Paysage",
        ratings: [{ userId: new mongoose.Types.ObjectId(), grade: 4 }],
        averageRating: 4.2,
    },
    {
        userId: new mongoose.Types.ObjectId(),
        title: "The Kinfolk Table",
        author: "Nathan Williams",
        imageUrl: "http://localhost:4000/images/livre3.jpg",
        year: 2022,
        genre: "Cuisine",
        ratings: [{ userId: new mongoose.Types.ObjectId(), grade: 5 }],
        averageRating: 3,
    },
    {
        userId: new mongoose.Types.ObjectId(),
        title: "Milwaukee Mission",
        author: "Elder Cooper",
        imageUrl: "http://localhost:4000/images/livre4.jpg",
        year: 2021,
        genre: "Policier",
        ratings: [{ userId: new mongoose.Types.ObjectId(), grade: 5 }],
        averageRating: 3,
    },
    {
        userId: new mongoose.Types.ObjectId(),
        title: "Book for Esther",
        author: "Alabaster",
        imageUrl: "http://localhost:4000/images/livre5.jpg",
        year: 2022,
        genre: "Paysage",
        ratings: [{ userId: new mongoose.Types.ObjectId(), grade: 5 }],
        averageRating: 4,
    },
    {
        userId: new mongoose.Types.ObjectId(),
        title: "The Kinfolk Table",
        author: "Nathan Williams",
        imageUrl: "http://localhost:4000/images/livre6.jpg",
        year: 2022,
        genre: "Cuisine",
        ratings: [{ userId: new mongoose.Types.ObjectId(), grade: 5 }],
        averageRating: 3,
    },
    {
        userId: new mongoose.Types.ObjectId(),
        title: "Milwaukee Mission",
        author: "Elder Cooper",
        imageUrl: "http://localhost:4000/images/livre7.jpg",
        year: 2021,
        genre: "Policier",
        ratings: [{ userId: new mongoose.Types.ObjectId(), grade: 5 }],
        averageRating: 3,
    },
    {
        userId: new mongoose.Types.ObjectId(),
        title: "Book for Esther",
        author: "Alabaster",
        imageUrl: "http://localhost:4000/images/livre8.jpg",
        year: 2022,
        genre: "Paysage",
        ratings: [{ userId: new mongoose.Types.ObjectId(), grade: 5 }],
        averageRating: 4,
    },
    {
        userId: new mongoose.Types.ObjectId(),
        title: "The Kinfolk Table",
        author: "Nathan Williams",
        imageUrl: "http://localhost:4000/images/livre9.jpg",
        year: 2022,
        genre: "Cuisine",
        ratings: [{ userId: new mongoose.Types.ObjectId(), grade: 1 }],
        averageRating: 3,
    },
];

mongoose
    .connect(process.env.DB_URI)
    .then(async () => {
        console.log("Connecté à MongoDB !");
        await Book.deleteMany(); // supprime les anciens livres
        await Book.insertMany(books);
        console.log("9 livres insérés avec succès !");
        mongoose.connection.close();
    })
    .catch((err) => console.error("Erreur :", err.message));
