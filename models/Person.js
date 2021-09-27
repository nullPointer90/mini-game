const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    Email:String,
    Name:String,
    Phone:String,
    Pay:Boolean,
    Wallet:String,
    Date:Date
});

module.exports = mongoose.model("people", personSchema);
