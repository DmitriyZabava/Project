const {Schema, model} = require("mongoose");

const User = new Schema({

    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: [{type: String, ref: "Role"}],
    basket: {type: Schema.Types.ObjectId, ref: "Basket"},
    purchaseHistory: [{type: String, ref: "AutoModels"}],
    favorite: {type: Schema.Types.ObjectId, ref: "Favorite"}
}, {
    timestamps: true
});

module.exports = model("User", User);