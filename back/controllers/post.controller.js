const db = require("../models");
const Post = db.Post;
const Profile = db.Profile;
const Image = db.Image;
const Follow = db.Follow;
const uploadFile = require("../middleware/upload")
const {Sequelize} = require("sequelize");

exports.getPost = (req, res) => {

    Post.findByPk(req.params.id)
        .then((post) => {
        if(post) {
            Profile.findByPk(post.id_profile)
                .then((profile) => {
                    res.status(200).send({post: post, profile: profile})
                }
            )
        } else {
            res.status(404).send({message: "Post introuvable"})
        }
    }).catch(err => {
        res.status(500).send({message: err.message})
    })
}

// Obtenir tous les posts d'un Profile particulier
exports.getAllPosts = (req, res) => {

    Post.findAll({
        where: {
            id_profile: req.params.id
        }, order: [['date', 'DESC']]
    }).then((posts) => {
        res.status(200).send(posts)
    }).catch(err => {
        res.status(500).send({message: err.message})
    })
}

exports.getInterestingPosts = (req, res) => {

    Profile.findOne({
        where: {
            user_id: req.userId
        }
    }).then((profile) => {
        Follow.findAll({
            where: {
                id_follower: profile.id
            }
        }).then((follows) => {
            const ids = [profile.id];
            follows.forEach((follow) => {
                ids.push(follow.id_followee);
            })

            Post.findAll({
                where: {
                    id_profile: {
                        [Sequelize.Op.in] : ids
                    }
                }, order: [['date', 'DESC']]
            }).then((posts) => {
                res.status(200).send(posts)
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

exports.postPost = async (req, res) => {

    req.filename = new Date().getTime().toString();
    await uploadFile.uploadFileMiddleware(req, res);

    if(req.validationError) {
        res.status(400).send({
            message: req.validationError
        })
        return;
    }

    let id_image = null;

    if (req.file !== undefined) {
        Image.create({
            img_src: req.filename,
            visibility: 0
        }).then((image) => {
            id_image = image.id;
        })
    } else if(req.body.text === undefined) {
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
        Post.create({
            date: new Date(),
            id_profile: profile.id,
            text: req.body.text === undefined ? null : req.body.text,
            visibility: 0,
            nb_votes: 0,
            id_image: id_image == null ? null : id_image,
            average_mark: 0
        })
    }).then(() => {
        res.status(200).send({
            message: "Post correctement créé !"
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

exports.deletePost = (req, res) => {

    Post.findByPk(req.params.id).then(
        (post) => {
            if(post) {
                Profile.findOne({
                    where: {
                        user_id: req.userId
                    }
                }).then((profile) => {
                    if(post.id_profile === profile.id) {
                        post.destroy().then(
                            () => {
                                res.status(200).send({
                                    message: "Post correctement supprimé"
                                })
                            }
                        ).catch((err) => {
                            res.status(500).send({
                                message: err.message
                            });
                        })
                    } else {
                        res.status(403).send({
                            message: "Ce post ne vous appartient pas"
                        })
                    }
                })
            } else {
                res.status(404).send({
                    message: "Post introuvable"
                })
            }
        }
    )
}