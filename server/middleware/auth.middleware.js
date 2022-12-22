const TokenService = require("../service/token.service");


module.exports = function(req, res, next) {
    if(req.method === "OPTIONS") {
        return next();
    }
    try {
        const authorizationHeader = req.headers.authorization;

        if(!authorizationHeader) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const accessToken = authorizationHeader.split(" ")[1];

        if(!accessToken) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const data = TokenService.validateAccess(accessToken);

        if(!data) {

            return res.status(401).json({message: "Unauthorized"});
        }
        req.user = data;
        next();
    } catch(error) {
        return res.status(401).json({message: "Unauthorized"});
    }

};