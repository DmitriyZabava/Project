const {Schema, model} = require("mongoose");

const Basket = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    userBasket: [{
        modelId: {type: String, ref: "AutoModels", unique: true},
        quantity: {type: Number},
        cost: {type: Number},
    }]
}, {
    timestamps: true
});

module.exports = model("Basket", Basket);