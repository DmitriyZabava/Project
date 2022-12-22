const {Schema, model} = require("mongoose");

const Favorite = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    modelsId: [{type: String, ref: "AutoModels", unique: true}]
}, {
    timestamps: true
});

module.exports = model("Favorite", Favorite);