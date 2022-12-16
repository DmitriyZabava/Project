const {Schema, model} = require("mongoose");

const User = new Schema({

    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, ref: "Role"},
    basket: [{type: String, ref: "AutoModels"}],
    purchaseHistory: [{type: String, ref: "AutoModels"}]
    // basket: [{type: Schema.Types.ObjectId, ref: "Models"}],
    // purchaseHistory: [{type: Schema.Types.ObjectId, ref: "Models"}]
}, {
    timestamps: true
});

module.exports = model("User", User);