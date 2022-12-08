const {Schema, model} = require("mongoose");

const schema = new Schema({
    material: {type: String},
    garanty: {type: String},
    section: {type: String},
    skeleton: {type: String},
    install: {type: String},
    comfort: {type: String},
    safety: {type: String},
    delivery: {type: String},
}, {
    timestamps: true
});

module.exports = model("Description", schema);