const {Schema, model} = require("mongoose");

const Description = new Schema({
    material: {type: String},
    guarantee: {type: String},
    section: {type: String},
    skeleton: {type: String},
    install: {type: String},
    comfort: {type: String},
    safety: {type: String},
    delivery: {type: String},
}, {
    timestamps: true
});

module.exports = model("Description", Description);