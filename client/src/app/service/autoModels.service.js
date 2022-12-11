import httpServices from "./http.service";

const autoModelsEndPoint = "autoModels/";

const autoModelsService = {
    fetchAll: async () => {
        const {data} = await httpServices.get(autoModelsEndPoint);
        return data;
    }
};

export default autoModelsService;