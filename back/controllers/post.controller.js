const db = require("../models");
const Post = db.Post;
const Profile = db.Profile;

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

exports.postPost = (req, res) => {

    Profile.findOne({
        where: {
            user_id: req.userId
        }
    }).then((profile) => {
        Post.create({
            date: new Date(),
            id_profile: profile.id,
            text: req.body.text,
            visibility: 0,
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
                res.status(404).send({
                    message: "Post introuvable"
                })
            }
        }
    )
}