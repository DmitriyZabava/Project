const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const createError = require("http-errors");

const User = require("../models/User");
const Role = require("../models/Role");


class AuthService {
    async signUp(email, password, username) {
        const candidate = await User.findOne({email});

        if(candidate) {
            throw createError(400, "EMAIL_EXIST");

        }
        const hashedPassword = await bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({role: "USER"});
        // Пока роль передам строкой , потом наверно поменяю на _id

        const {_id, role} = await User.create(
            {username, email, password: hashedPassword, role: userRole.role}
        );
        const user = {_id, role, username, email};
        const tokens = tokenService.generateTokens({user});
        await tokenService.saveToken(_id, tokens.refreshToken);
        return {...tokens, user};
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

        const {_id, role, username} = candidate;
        const user = {_id, role, username, email};
        const tokens = tokenService.generateTokens({user});
        await tokenService.saveToken(_id, tokens.refreshToken);
        return {...tokens, user};


    }


    async logout(email, password) {
    }


}


module.exports = new AuthService();