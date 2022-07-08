const { Schema, model } = require("mongoose");

const schema = Schema({
    guildID: String,
    userID: String,
    Regular: Number,
    Fake: Number,
    Left: Number,
    Bonus: Number,
    leftedMembers: { type: Array, default: [] }
});

module.exports = model('adofxinvite', schema)