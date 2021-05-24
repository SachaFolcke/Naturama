const db = require("../models");
const Comment = db.Comment;
const Profile = db.Profile;

exports.postComment = (req, res) => {

    if(req.body.content === undefined || req.body.content.length <= 0) {
        res.status(400).send({
            message: "Aucun contenu envoyé"
        })
        return;
    }

    Profile.findOne({
        where: {
            user_id: req.userId
        }
    }).then((profile) => {
        Comment.create({
            id_profile: profile.id,
            id_post: req.params.id,
            date: new Date(),
            content: req.body.content
        }).then(() => {
            res.status(200).send({
                message: "Commentaire envoyé"
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            })
        })
    })
}

exports.deleteComment = (req, res) => {

    Comment.findByPk(req.params.id).then(
        (comment) => {
            if(comment) {
                Profile.findOne({
                    where: {
                        user_id: req.userId
                    }
                }).then((profile) => {
                    if(comment.id_profile === profile.id) {
                        comment.destroy().then(
                            () => {
                                res.status(200).send({
                                    message: "Commentaire correctement supprimé"
                                })
                            }
                        ).catch((err) => {
                            res.status(500).send({
                                message: err.message
                            });
                        })
                    } else {
                        res.status(403).send({
                            message: "Ce commentaire ne vous appartient pas"
                        })
                    }
                })
            } else {
                res.status(404).send({
                    message: "Commentaire introuvable"
                })
            }
        }
    )
}

exports.getPostComments = (req, res) => {

    Comment.findAll({
        where: {
            id_post: req.params.id
        },
        include: Profile,
        order: [['date', 'DESC']]
    }).then((comments) => {
        res.status(200).send(comments)
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        })
    })
}