// Models
const AutoBrand = require("../models/AutoBrand");
const AutoModels = require("../models/AutoModels");
const Description = require("../models/Description");
//Mock Data
const autoBrandMock = require("../mockData/autoBrand.json");
const autoModelsMock = require("../mockData/autoModels.json");
const descriptionMock = require("../mockData/description.json");


module.exports = async () => {
    try {
        const autoBrand = await AutoBrand.find();
        if(autoBrand.length !== autoBrandMock.length) {
            await createInitialEntity(AutoBrand, autoBrandMock);
        }

        const autoModels = await AutoModels.find();
        if(autoModels.length !== autoModelsMock.length) {
            await createInitialEntity(AutoModels, autoModelsMock);
        }

        const description = await Description.find();
        if(description.length !== descriptionMock.length) {
            await createInitialEntity(Description, descriptionMock);
        }

    } catch(error) {
    }
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(data.map(async (item) => {
        try {
            delete item._id;
            const newItem = new Model(item);
            await newItem.save();
            return newItem;
        } catch(error) {
            return error;
        }
    }));

}