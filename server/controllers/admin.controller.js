const path = require("path");
const uuid = require('uuid');

const AutoModels = require("../models/AutoModels");
const AutoBrand = require("../models/AutoBrand");

class AdminController {
    async createModel(req, res, next) {
        try {
            const {id, name, brand, title, price, size, isAvailable, discount, color} = req.body;
            console.log(brand);
            const {img} = req.files;
            const fileName = `${uuid.v4()}.jpg`;
            await img.mv(path.resolve(__dirname, "..", "static", fileName));
            const autoBrand = await AutoBrand.findOne({brand});

            if(autoBrand) {
                const model = await AutoModels.create({
                    id,
                    name,
                    brand,
                    brandId: autoBrand._id,
                    title,
                    price: Number(price),
                    image: fileName,
                    size,
                    color,
                    isAvailable: Number(isAvailable),
                    discount: Number(discount)
                });
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
                    image: fileName,
                    size,
                    isAvailable: Number(isAvailable),
                    discount: Number(discount)
                });
                await newBrand.models.push(model._id);
                await newBrand.save();
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
                message: "На сервере произошла ошибкаю Попробуйте позже ..."
            });
        }
    }

    async updateModel(req, res, next) {
        try {
            const {id} = req.params;

        } catch(error) {

        }
    }

    async deleteModel(req, res, next) {
        try {
        } catch(error) {

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
        } catch(error) {

        }
    }

    async updateBrand(req, res, next) {
        try {
        } catch(error) {

        }
    }

    async deleteBrand(req, res, next) {
        try {
        } catch(error) {

        }
    }

    async createModerator(req, res, next) {
        try {
        } catch(error) {

        }
    }
}

module.exports = new AdminController();