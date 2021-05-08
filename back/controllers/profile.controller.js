const db = require("../models");
const Profile = db.Profile;
const jwt = require("../middleware/verifyToken")

exports.getProfileByUserId = (req, res) => {

    jwt.verifyToken(req, res);

    Profile.findOne({
        where: {
            user_id: req.params.id
        }})
        .then((profile) =>
            res.status(200).send(profile)
        ).catch(err => {
            res.status(500).send({ message: err.message })
    })
}