const mongoose = require("mongoose");
const uniqueValidatorImport = require("mongoose-unique-validator");
const uniqueValidator = uniqueValidatorImport.default || uniqueValidatorImport;

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

//Pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail, nous utiliserons le mot clé unique pour l'attribut email du schéma d'utilisateur userSchema.
//Dans notre schéma, la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in, s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail.
