const db = require("../models");
const User = db.User;

checkDuplicateEmail = (req, res, next) => {
        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Cet email est déjà utilisé."
                });
                return;
            }

            next();
        });
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;