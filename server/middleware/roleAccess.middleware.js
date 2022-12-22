const TokenService = require("../service/token.service");


module.exports = function(roles) {
    return function(req, res, next) {
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
            const {role: userRole} = TokenService.validateAccess(accessToken);
            let hasRole = false;
            userRole.forEach((role) => {
                if(roles.includes(role)) {
                    hasRole = true;
                }
            });
            if(!hasRole) {
                return res.status(401).json({message: "NO_ACCESS"});
            }

            next();
        } catch(error) {
            return res.status(401).json({message: "Unauthorized"});
        }

    };


};