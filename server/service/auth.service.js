const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const createError = require("http-errors");

const User = require("../models/User");
const Role = require("../models/Role");
const Basket = require("../models/Basket");
const Favorite = require("../models/Favorite");
const TokenService = require("./token.service");


class AuthService {
    async signUp(email, password, username) {
        const candidate = await User.findOne({email});

        if(candidate) {
            throw createError(400, "EMAIL_EXIST");

        }
        const hashedPassword = await bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({role: "USER"});


        const newBasket = await Basket.create({userName: username});
        const newFavorite = await Favorite.create({userName: username});

        const {_id: userId, role} = await User.create(
            {
                username,
                email,
                password: hashedPassword,
                role: userRole.role,
                basket: newBasket._id,
                favorite: newFavorite._id
            }
        );
        await Basket.findByIdAndUpdate(newBasket._id, {$set: {userId: userId}}, {new: true});
        await Favorite.findByIdAndUpdate(newFavorite._id, {$set: {userId: userId}}, {new: true});


        const tokens = tokenService.generateTokens({userId, role});
        await tokenService.saveToken(userId, tokens.refreshToken);

        return {...tokens, userId: userId, role};
    }


    async login(email, password) {
        const candidate = await User.findOne({email});
        if(!candidate) {
            throw createError(400, "EMAIL_NOT_FOUND");

        }

        const isPasswordEqual = await bcrypt.compare(password, candidate.password);

        if(!isPasswordEqual) {
            throw createError(400, "INVALID_PASSWORD");

        }

        const {_id, role} = candidate;

        const tokens = tokenService.generateTokens({_id, role});
        await tokenService.saveToken(_id, tokens.refreshToken);
        return {...tokens, userId: _id, role};


    }


    async logout(refreshToken) {
        try {
            return await tokenService.removeToken(refreshToken);

        } catch(error) {
            return error;
        }
    }

    async refresh(refreshToken) {
        try {
            if(!refreshToken) {
                // throw createError(401, "Unauthorized");
                return new Error("Unauthorized");
            }
            const data = TokenService.validateRefresh(refreshToken);

            const dbToken = await TokenService.findToken(refreshToken);

            if(!data || !dbToken) {
                // throw createError(401, "Unauthorized");
                return new Error("Unauthorized");
            }
            const {_id, role} = data;

            const tokens = TokenService.generateTokens({_id, role});
            await TokenService.saveToken(_id, tokens.refreshToken);

            return {...tokens, userId: _id, role};
        } catch(error) {
            return error.message;

        }

    }


}


module.exports = new AuthService();