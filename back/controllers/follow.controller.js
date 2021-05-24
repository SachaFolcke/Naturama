const db = require("../models");
const Follow = db.Follow;
const Profile = db.Profile;

exports.submitFollow = (req, res) => {

    if (req.query.id === undefined || req.query.id === null) {
        res.status(400).send({
            message: "Id cible manquant"
        });
        return;
    }

    Profile.findOne({
        where: {
            user_id: req.userId
        }
    }).then((profile) => {
        Follow.findOne({
            where: {
                id_follower: profile.id,
                id_followee: req.query.id
            }
        }).then((follow) => {
            if (follow) {
                follow.destroy();
                res.status(200).send({
                    message: "Abonnement supprimé"
                });
            } else {
                Follow.create({
                    id_follower: profile.id,
                    id_followee: req.query.id
                }).then(() => {
                        res.status(200).send({
                            message: "Abonnement créé"
                        })
                    }
                );
            }
        }).then(() => {
            Profile.findByPk(req.query.id)
            .then((profile) => {
                profile.updateFollowerCount();
            })}
        )
    })
}

exports.checkFollow = (req, res) => {

    if (req.query.id === undefined || req.query.id === null) {
        res.status(400).send({
            message: "Id cible manquant"
        });
        return;
    }

    Profile.findOne({
        where: {
            user_id: req.userId
        }
    }).then((profile) => {
        Follow.findOne({
            where: {
                id_follower: profile.id,
                id_followee: req.query.id
            }
        }).then((follow) => {
            if (follow) {
                res.status(200).send(true)
            } else {
                res.status(200).send(false)
            }
        })
    })
}

exports.checkFollowing = (req, res) => {

    if (req.query.id === undefined || req.query.id === null) {
        res.status(400).send({
            message: "Id source manquant"
        });
        return;
    }

    Profile.findOne({
        where: {
            user_id: req.userId
        }
    }).then((profile) => {
        Follow.findOne({
            where: {
                id_follower: req.query.id,
                id_followee: profile.id
            }
        }).then((follow) => {
            if (follow) {
                res.status(200).send(true)
            } else {
                res.status(200).send(false)
            }
        })
    })
}