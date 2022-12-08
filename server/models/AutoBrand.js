const {Schema, model} = require("mongoose");

const schema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},

    // models: [{type: Schema.Types.ObjectId, ref: "AutoModels"}]
    models: {type: Array.of(String)}
}, {
    timestamps: true
});

module.exports = model("AutoBrand", schema);