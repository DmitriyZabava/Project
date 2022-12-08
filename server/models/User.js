const {Schema, model} = require("mongoose");

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    basket: {type: Array.of(String)},
    purchaseHistory: {type: Array.of(String)}
    // basket: [{type: Schema.Types.ObjectId, ref: "Models"}],
    // purchaseHistory: [{type: Schema.Types.ObjectId, ref: "Models"}]
}, {
    timestamps: true
});

module.exports = model("User", schema);