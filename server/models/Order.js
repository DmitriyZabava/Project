const {Schema, model} = require("mongoose");

const Order = new Schema({
    date: {type: Date, default: Date.now},
    order: {type: Number},
    list: [{
        model: {ref: "automodels", type: String},
        quantity: {type: Number},
        cost: {type: Number}
    }],
    user: {ref: "users", type: Schema.Types.ObjectId}
});

module.exports = model("Order", Order);