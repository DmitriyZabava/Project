const {Schema, model} = require("mongoose");

const Basket = new Schema({
    userName: {type: String, ref: "User"},
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    userBasket: [{
        modelId: {type: String, ref: "AutoModels"},
        quantity: {type: Number},
        cost: {type: Number},

    }]
}, {
    timestamps: true
});


module.exports = model("Basket", Basket);