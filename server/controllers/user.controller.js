const User = require("../models/User");

class UserController {

    async findUserById(req, res, next) {
        try {
            const {id} = req.params;
            const {_id, email, username, role, basket, purchaseHistory} = await User.findById(id);

            // отбросил heshPassword у юзера
            const user = {_id, email, username, role, basket, purchaseHistory};

            res.status(200).send(user);
        } catch(error) {
            res.status(500).json({
                eMessage: error.message,
                message: "На сервере произошла ошибкаю Попробуйте позже ..."
            });
        }

    }
}

module.exports = new UserController();