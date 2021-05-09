const db = require("../models");
const Profile = db.Profile;

exports.getProfileByUserId = (req, res) => {

    Profile.findOne({
        where: {
            user_id: req.params.id
        }})
        .then((profile) => {
                if (profile) {
                    res.status(200).send(profile)
                } else {
                    res.status(404).send({message: "Profil introuvable"})
                }
            }
        ).catch(err => {
        res.status(err.statusCode).send({ message: err.message })
    })
}

exports.getProfile = (req, res) => {

    Profile.findOne({
        where: {
            id: req.params.id
        }})
        .then((profile) => {
                if(profile) {
                    res.status(200).send(profile)
                } else {
                    res.status(404).send({message: "Profil introuvable"})
                }
            }
        ).catch(err => {
        res.status(err.statusCode).send({ message: err.message })
    })
}