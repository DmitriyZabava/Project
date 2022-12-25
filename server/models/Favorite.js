const {Schema, model} = require("mongoose");

const Favorite = new Schema({
    userName: {type: String, ref: "User"},
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    modelsId: [{type: String, ref: "AutoModels"}]
}, {
    timestamps: true
});

module.exports = model("Favorite", Favorite);