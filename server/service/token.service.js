const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.get("accessSecret"), {expiresIn: "1h"});
        const refreshToken = jwt.sign(payload, config.get("refreshSecret"), {expiresIn: "15d"});

        return {accessToken, refreshToken, expiresIn: 3600};
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

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.get("refreshSecret"));
        } catch(e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        try {
            return await Token.findOne({refreshToken});
        } catch(e) {
            return null;
        }
    }

}

module.exports = new TokenService();