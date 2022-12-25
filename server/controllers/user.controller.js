const User = require("../models/User");
const Basket = require("../models/Basket");
const Favorite = require("../models/Favorite");

class UserController {

    async findUserById(req, res, next) {
        try {
            const {id} = req.params;
            const {_id, email, username, role, basket, purchaseHistory, favorite} = await User.findById(id);

            const user = {_id, email, username, role, basket, purchaseHistory, favorite};

            res.status(200).send(user);
        } catch(error) {
            res.status(500).json({
                eMessage: error.message,
                message: "Internal Server Error"
            });
        }

    }

    async findBasketById(req, res, next) {
        try {
            const {id} = req.params;
            const userBasket = await Basket.findById(id);
            res.status(200).send(userBasket);
        } catch(error) {
            res.status(412).json({
                eMessage: error.message,
                message: "Precondition Failed"
            });

        }
    }

    async findFavoriteById(req, res, next) {
        try {
            const {id} = req.params;
            const userFavorite = await Favorite.findById(id);
            res.status(200).send(userFavorite);
        } catch(error) {
            res.status(412).json({
                eMessage: error.message,
                message: "Precondition Failed"
            });
        }
    }

    async addToFavorite(req, res, next) {
        try {
            const {id} = req.params;
            const {modelId} = req.body;
            const {modelsId} = await Favorite.findOne({userId: id});

            if(modelsId.includes(modelId)) {
                res.status(200).send(modelsId);
            } else {
                const {modelsId} = await Favorite.findOneAndUpdate(
                    {userId: id},
                    {$push: {modelsId: modelId}},
                    {new: true}
                );
                res.status(200).send(modelsId);
            }
        } catch(error) {
            res.status(500).json({
                eMessage: error.message,
                message: "Internal Server Error"
            });
        }
    }


    async removeFromFavorite(req, res, next) {
        try {
            const {id} = req.params;
            const {modelId} = req.body;
            const favorite = await Favorite.findOne({userId: id});
            const filteredModels = favorite.modelsId.filter(item => item !== modelId);

            const {modelsId} = await Favorite.findOneAndUpdate(
                {userId: id},
                {$set: {modelsId: filteredModels}}
                , {new: true}
            );
            res.status(200).send(modelsId);
        } catch(error) {
            res.status(500).json({
                eMessage: error.message,
                message: "Internal Server Error"
            });

        }
    }

    async addToBasket(req, res, next) {
        try {
            const {id} = req.params;
            const {model} = req.body;
            const {userBasket} = await Basket.findOneAndUpdate(
                {userId: id},
                {$push: {userBasket: model}},
                {new: true}
            );

            res.status(200).send(userBasket);
        } catch(error) {
            res.status(500).json({
                eMessage: error.message,
                message: "Internal Server Error"
            });
        }
    }

    async removeFromBasket(req, res, next) {
        try {
            const {id} = req.params;
            const {modelId} = req.body;
            const basket = await Basket.findOne({userId: id});

            const filteredBasket = basket.userBasket.filter((item) => item.modelId !== modelId);
            const {userBasket} = await Basket.findOneAndUpdate(
                {userId: id},
                {$set: {userBasket: filteredBasket}},
                {new: true}
            );

            res.status(200).send(userBasket);
        } catch(error) {
            res.status(500).json({
                eMessage: error.message,
                message: "Internal Server Error"
            });

        }
    }

    async incrementModel(req, res, next) {
        try {
            const {id} = req.params;
            const {newBasket} = req.body;
            const {userBasket} = await Basket.findOneAndUpdate(
                {userId: id},
                {$set: {userBasket: newBasket}},
                {new: true}
            );

            res.status(200).send(userBasket);
        } catch(error) {
            res.status(500).json({
                eMessage: error.message,
                message: "Internal Server Error"
            });
        }
    }

    async decrementModel(req, res, next) {
        try {
            const {id} = req.params;
            const {newBasket} = req.body;
            const {userBasket} = await Basket.findOneAndUpdate(
                {userId: id},
                {$set: {userBasket: newBasket}},
                {new: true}
            );
            res.status(200).send(userBasket);
        } catch(error) {
            res.status(500).json({
                eMessage: error.message,
                message: "Internal Server Error"
            });
        }
    }

}

module.exports = new UserController();