const mongoose = require("mongoose");
const uniqueValidatorImport = require("mongoose-unique-validator");
const uniqueValidator = uniqueValidatorImport.default || uniqueValidatorImport;

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
