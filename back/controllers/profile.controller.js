const db = require("../models");
const Profile = db.Profile;
const Image = db.Image;
const uploadFile = require("../middleware/upload")
const fs = require('fs')

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
        res.status(500).send({ message: err.message })
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
        res.status(500).send({ message: err.message })
    })
}


exports.submitProfilePicture = async (req, res) => {
    req.filename = new Date().getTime().toString();
    await uploadFile.uploadFileMiddleware(req, res);

    if(req.validationError) {
        res.status(400).send({
            message: req.validationError
        })
        return;
    }

    if (req.file !== undefined) {
        Image.create({
            img_src: req.filename,
            visibility: 0
        }).then((image) => {
            Profile.findOne({
                where: {
                    user_id: req.userId
                }
            }).then((profile) => {
                if(profile.id_image_profile != null) {
                    Image.findByPk(profile.id_image_profile)
                        .then((image) => {
                            if (image) {
                                fs.unlink(`uploads/${image.img_src}`,
                                    (err => {
                                        if(err) {
                                            console.log(err)
                                        }
                                    })
                                );
                                image.destroy();
                            }
                        })
                }
                profile.id_image_profile = image.id;
                profile.save().then(() => res.status(200).send({
                    message: "Photo de profil correctement modifiée"
                })).catch((err) => res.status(500).send({
                    message: err.message
                }))
            })
        })
    } else {
        res.status(400).send({
            message: "Aucun image envoyée"
        })
    }
}

exports.submitBannerPicture = async (req, res) => {
    req.filename = new Date().getTime().toString();
    await uploadFile.uploadFileMiddleware(req, res);

    if(req.validationError) {
        res.status(400).send({
            message: req.validationError
        })
        return;
    }

    if (req.file !== undefined) {
        Image.create({
            img_src: req.filename,
            visibility: 0
        }).then((image) => {
            Profile.findOne({
                where: {
                    user_id: req.userId
                }
            }).then((profile) => {
                if(profile.id_image_banner != null) {
                    Image.findByPk(profile.id_image_banner)
                        .then((image) => {
                            if (image) {
                                fs.unlink(`uploads/${image.img_src}`,
                                    (err => {
                                        if(err) {
                                            console.log(err)
                                        }
                                    })
                                );
                                image.destroy();
                            }
                        })
                }
                profile.id_image_banner = image.id;
                profile.save()
                    .then(() => res.status(200).send({
                        message: "Bannière correctement modifiée"
                    })).catch((err) => res.status(500).send({
                        message: err.message
                 }))
            })
        })
    } else {
        res.status(400).send({
            message: "Aucun image envoyée"
        })
    }
}

exports.submitInfos = (req, res) => {
    Profile.findOne({
        where: {
            user_id: req.userId
        }
    }).then((profile) => {
        profile.last_name = req.body.last_name || profile.last_name;
        profile.first_name = req.body.first_name || profile.first_name;
        profile.birthday = req.body.birthday || profile.birthday;
        profile.bio = req.body.bio || profile.bio;
        profile.location = req.body.location || profile.location;
        profile.save()
            .then(() => res.status(200).send({
                message: "Informations correctement modifiées"
            })
        ).catch((err) => res.status(500).send({
            message: err.message
        }));

    })
}