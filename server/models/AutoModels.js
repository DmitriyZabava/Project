const {Schema, model} = require("mongoose");

const AutoModels = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    // brand: {type: Schema.Types.ObjectId, ref: "AutoBrand"},
    brand: {type: String, ref: "AutoBrand"},
    title: {type: String},
    price: {type: Number, required: true},
    image: {type: String},
    size: {type: String, required: true},
    color: {type: String, required: true},
    isAvailable: Number,
    discount: Number,
    description: {type: Object, ref: "Description"}
}, {
    timestamps: true
});

module.exports = model("AutoModels", AutoModels);