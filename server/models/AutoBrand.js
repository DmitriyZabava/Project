const {Schema, model} = require("mongoose");

const AutoBrand = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},

    // models: [{type: Schema.Types.ObjectId, ref: "AutoModels"}]
    models: [{type: String, ref: "AutoModels"}]
}, {
    timestamps: true
});

module.exports = model("AutoBrand", AutoBrand);