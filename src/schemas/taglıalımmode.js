const { Schema, model } = require("mongoose");

const schema = Schema({
    tagMode: Boolean,
});

module.exports = model("taglıalımmode", schema);