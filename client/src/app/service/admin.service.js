import httpServices from "./http.service";

const adminService = {
    createModel: async (payload) => {
        const {data} = await httpServices.post("admin/model", {payload});
        return data;
    }
    ,
    createBrand: async (payload) => {
        const {data} = await httpServices.post("admin/model", {payload});
        return data;
    },
    createModerator: async ({email, password, username, role}) => {
        const {data} = await httpServices.post("admin/model", {
            email, password, username, role
        });
        return data;
    }
};

export default adminService;