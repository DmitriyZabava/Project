import httpServices from "./http.service";

const autoBrandEndPoint = "autoBrand/";

const autoBrandService = {
    fetchAll: async () => {
        const {data} = await httpServices.get(autoBrandEndPoint);
        return data;
    }
};
export default autoBrandService;