const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const bookApi = require("./api/bookApi");
const userApi = require("./api/userApi");

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((err) =>
        console.error("Connexion à MongoDB échouée !", err.message),
    );

app.use(cors());

// Middleware JSON
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/books", bookApi);
app.use("/api/auth", userApi);

module.exports = app;
