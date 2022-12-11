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
        const description = await Description.find();
        if(description.length !== descriptionMock.length) {
            await createInitialEntity(Description, descriptionMock);
        }

        const autoModels = await AutoModels.find();
        if(autoModels.length !== autoModelsMock.length) {
            await createInitialEntity(AutoModels, autoModelsMock);
        }

        const autoBrand = await AutoBrand.find();
        if(autoBrand.length !== autoBrandMock.length) {

            await createBrand(AutoBrand, autoBrandMock, AutoModels);
        }


    } catch(error) {
    }
};

async function createBrand(Model, data, modelsAuto) {
    await Model.collection.drop();
    const autoModel = await modelsAuto.find();
    return ( autoModel && Promise.all(data.map(async (item) => {
        try {
            const brand = item.name.toLowerCase();
            const models = await autoModel.reduce((acc, i) => {
                if(i.brand === brand) {
                    acc.push(i._id);
                }
                return acc;
            }, []);

            delete item._id;
            const newItem = new Model({...item, models});
            await newItem.save();
            return newItem;
        } catch(error) {
            return error;

        }
    })) );
}

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

