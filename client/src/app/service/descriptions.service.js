import httpServices from "./http.service";

const descriptionsEndPoint = "descriptions/";

const descriptionsService = {
    fetchAll: async () => {
        const {data} = await httpServices.get(descriptionsEndPoint);
        return data;
    }
};
export default descriptionsService;