import httpServices from "./http.service";
import localStorageService from "./localStorage.service";

const userFavoriteEndPoint = "user/favorite/";

const userFavoriteService = {
    getById: async (id) => {
        const {data} = await httpServices.get(userFavoriteEndPoint + id);

        return data;
    },
    addModelToFavorite: async (modelId) => {

        const {data} = await httpServices.patch(
            userFavoriteEndPoint + localStorageService.getUser(),
            {modelId: modelId});
        return data;
    },
    removeToFavorite: async (modelId) => {
        const {data} = await httpServices.patch(
            userFavoriteEndPoint + "delete/" + localStorageService.getUser(),
            {modelId: modelId});
        return data;
    }
};

export default userFavoriteService;