const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.get("accessSecret"), {expiresIn: "1h"});
        const refreshToken = jwt.sign(payload, config.get("refreshSecret"), {expiresIn: "15d"});

        return {accessToken, refreshToken};
    }

    async saveToken(userId, refreshToken) {
        const existToken = await Token.findOne({userId});
        if(existToken) {
            existToken.refreshToken = refreshToken;
            return existToken.save();
        }
        const token = await Token.create({userId, refreshToken});
        return token;

    }

}

module.exports = new TokenService();