const path = require("path");
const config = require("config");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const AutoModels = require("../models/AutoModels");
const AutoBrand = require("../models/AutoBrand");
const User = require("../models/User");
const Role = require("../models/Role");
const tokenService = require("../service/token.service");
const strConvert = require("../utils/strConvert");
const PORT = config.get("PORT");

class AdminController {
    async createModel(req, res, next) {
        try {
            const {id, name, brand, title, price, size, isAvailable, discount, color} = JSON.parse(req.body.data);


            const {img} = req.files;
            const fileName = `${strConvert(name)}_${Date.now()}.jpg`;
            await img.mv(path.resolve(__dirname, "..", "static", fileName));
            const autoBrand = await AutoBrand.findOne({id: brand});

            if(autoBrand) {
                const model = await AutoModels.create({
                    id,
                    name,
                    brand,
                    brandId: autoBrand._id,
                    title,
                    price: Number(price),
                    image: `http://localhost:${PORT}/${fileName}`,
                    size,
                    color,
                    isAvailable: Number(isAvailable),
                    discount: Number(discount)
                });

                await AutoBrand.findByIdAndUpdate(autoBrand._id, {$push: {models: model._id}}, {new: true});
                res.status(200).json(model);
            } else {
                const autoBrandName = brand[0].toUpperCase() + brand.substring(1);
                const newBrand = await AutoBrand.create({id: brand, name: autoBrandName});
                const model = await AutoModels.create({
                    id,
                    name,
                    brand,
                    brandId: newBrand._id,
                    title,
                    price: Number(price),
                    image: `http://localhost:5000/${fileName}`,
                    size,
                    color,
                    isAvailable: Number(isAvailable),
                    discount: Number(discount)
                });
                await AutoBrand.findByIdAndUpdate(newBrand._id, {$push: {models: model._id}}, {new: true});

                res.status(200).json(model);
            }

        } catch(error) {
            res.json(error);

        }
    }

    async getModelById(req, res, next) {
        try {
            const {id} = req.params;
            const {model} = await AutoModels.findById(id);
            res.status(200).send(model);
        } catch(error) {
            res.status(500).json({
                eMessage: error.message,
                message: "На сервере произошла ошибка Попробуйте позже ..."
            });
        }
    }

    async updateModel(req, res, next) {
        try {
            const {_id} = req.params;
            const {id, name, brand, title, price, size, isAvailable, discount, color} = req.body;
            const {img} = req.files;
            const fileName = `${name}${Date.now()}.jpg`;
            const updateData = {
                id,
                name,
                brand,
                title,
                price: Number(price),
                image: `http://localhost:5000/${fileName}`,
                size,
                color,
                isAvailable: Number(isAvailable),
                discount: Number(discount)
            };
            await img.mv(path.resolve(__dirname, "..", "static", fileName));
            const updatedModel = await AutoModels.findByIdAndUpdate(_id, {$set: {...updateData}}, {new: true});
            res.status(200).send(updatedModel);
        } catch(error) {
            throw createError(500, "Server ERROR");
        }
    }

    async deleteModel(req, res, next) {
        try {
            const {id} = req.params;
            const model = await AutoModels.findByIdAndDelete(id);
            res.status(200).send(model);
        } catch(error) {
            throw createError(500, "Server ERROR");

        }
    }

    async getBrandBYId(req, res, next) {
        try {
            const {id} = req.params;
            const {brand} = await AutoBrand.findById(id);
            res.status(200).send(brand);
        } catch(error) {
            res.status(500).json({
                eMessage: error.message,
                message: "На сервере произошла ошибкаю Попробуйте позже ..."
            });
        }
    }

    async createBrand(req, res, next) {
        try {
            const {id, name, models} = req.body;
            const brand = await AutoBrand.create({id, name, models});
            res.status(200).send(brand);
        } catch(error) {
            throw createError(500, "Server ERROR");

        }
    }

    async updateBrand(req, res, next) {
        try {
            const _id = req.params;
            const updateData = req.body;
            const updatedBrand = await AutoBrand.findByIdAndUpdate(_id, {$set: {...updateData}}, {new: true});
            res.status(200).send(updatedBrand);
        } catch(error) {
            throw createError(500, "Server ERROR");
        }
    }

    async deleteBrand(req, res, next) {
        try {
            const {id} = req.params;
            const brand = await AutoBrand.findByIdAndDelete(id);
            res.status(200).send(brand);
        } catch(error) {
            throw createError(500, "Server ERROR");

        }
    }

    async createModerator(req, res, next) {
        try {
            const {username, email, password} = req.body;
            const candidate = await User.findOne({email});
            if(candidate) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXIST",
                        code: 400
                    }
                });

            }
            const hashedPassword = await bcrypt.hashSync(password, 10);
            const userRole = await Role.findOne({role: "MODERATOR"});
            const {_id, role} = await User.create(
                {username, email, password: hashedPassword, role: userRole.role}
            );
            const tokens = tokenService.generateTokensForModerator({_id, role});
            await tokenService.saveToken(_id, tokens.refreshToken);
            res.status(200).send("Moderator Created Success");
        } catch(error) {

        }
    }
}

module.exports = new AdminController();