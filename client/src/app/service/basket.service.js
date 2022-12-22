import httpServices from "./http.service";
import localStorageService from "./localStorage.service";

const userBasketEndPoint = "user/basket/";

const userBasketService = {
    getById: async (id) => {
        const {data} = await httpServices.get(userBasketEndPoint + id);

        return data;
    },
    addBasket: async (model) => {
        const {data} = await httpServices.patch(
            userBasketEndPoint + localStorageService.getUser(),
            model);
        return data;
    }
};

export default userBasketService;