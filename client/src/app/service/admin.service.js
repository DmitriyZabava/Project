import httpServices from "./http.service";
import fileConfig from "../config.json";

const adminService = {
    getModelById: async (modelId) => {
        const {data} = await httpServices.get(fileConfig.adminEndPoint.model + "get" + modelId);
        return data;
    },
    createModel: async (payload) => {
        const {data} = await httpServices.post(fileConfig.adminEndPoint.model + "create", payload);
        return data;
    },
    updateModel: async (payload, modelId) => {
        const {data} = await httpServices.patch(fileConfig.adminEndPoint.model + "update/" + modelId, {payload});
        return data;
    },
    deleteModel: async (modelId) => {
        const {data} = await httpServices.delete(fileConfig.adminEndPoint.model + "delete/" + modelId);
        return data;
    },
    getBrandById: async (brandId) => {
        const {data} = await httpServices.get(fileConfig.adminEndPoint.brand + "get" + brandId);
        return data;
    },
    createBrand: async (payload) => {
        const {data} = await httpServices.post(fileConfig.adminEndPoint.brand + "create", {payload});
        return data;
    },
    updateBrand: async (payload, modelId) => {
        const {data} = await httpServices.patch(fileConfig.adminEndPoint.brand + "update/" + modelId, {payload});
        return data;
    },
    deleteBrand: async (modelId) => {
        const {data} = await httpServices.delete(fileConfig.adminEndPoint.brand + "delete/" + modelId);
        return data;
    },
    createModerator: async ({email, password, username, role}) => {
        const {data} = await httpServices.post(fileConfig.adminEndPoint.moderator, {
            email, password, username, role
        });
        return data;
    },
};

export default adminService;