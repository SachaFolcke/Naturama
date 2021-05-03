const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Sauvegarde d'un nouvel User dans la BDD
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(() =>
        res.status(200).send({
           message: "Utilisateur correctement créé !"
        })
    )
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Email introuvable." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Mot de passe incorrect"
                });
            }

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                email: user.email,
                accessToken: token
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};