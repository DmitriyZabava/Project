const AuthService = require("../service/auth.service");
const TokenService = require("../service/token.service");
const {validationResult} = require("express-validator");


class AuthController {
    async signUp(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                    }
                });
            }
            const {email, password, username} = req.body;

            const userData = await AuthService.signUp(email, password, username);

            return res.status(200).send(userData);

        } catch(error) {
            res.status(500).json({
                error: error.message,
                message: "На сервере произошла ошибка регистрации . Попробуйте позже ..."
            });

        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                    }
                });
            }
            const {email, password} = req.body;
            const userData = await AuthService.login(email, password);


            return res.status(200).send(userData);
        } catch(error) {
            res.status(500).json({
                error: error.message,
                message: "На сервере произошла ошибка авторизации . Попробуйте позже ..."
            });

        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.body;
            const token = await AuthService.logout(refreshToken);

            return res.status(200).json(token);
        } catch(error) {
            res.status(500).json({
                error: error.message,
                message: "На сервере произошла ошибка . Попробуйте позже ..."
            });

        }
    }

    async token(req, res, next) {
        try {
            const {refreshToken} = req.body;
            const userData = await AuthService.refresh(refreshToken);

            res.status(200).send(userData);
        } catch(error) {
            res.status(500).json({
                error: error.message,
                message: "На сервере произошла ошибка . Попробуйте позже ..."
            });
        }
    }
}

module.exports = new AuthController();