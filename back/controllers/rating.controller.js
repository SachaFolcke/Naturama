const db = require("../models");
const Post = db.Post;
const Profile = db.Profile;
const Rating = db.Rating;

exports.submitMark = (req, res) => {

    Post.findByPk(req.params.id)
        .then((post) => {
            if(!post) {
                res.status(404).send({
                    message: "Post introuvable"
                })
            } else {
                Profile.findOne({
                    where: {
                        user_id: req.userId
                    }
                }).then((profile) => {
                    Rating.findOne({
                        where: {
                            id_profile: profile.id,
                            id_post: req.params.id
                        }
                    }).then((rating) => {
                        if(rating) {
                            rating.mark = req.body.mark;
                            rating.date = new Date();
                            rating.save().then(() =>
                                res.status(200).send({
                                    message: "Note mise à jour"
                                })
                            );
                        } else {
                            Rating.create({
                                id_profile: profile.id,
                                id_post: req.params.id,
                                date: new Date(),
                                mark: req.body.mark
                            }).then(() =>
                                res.status(200).send({
                                    message: "Note ajoutée"
                                })
                            );
                        }
                    }).then(() => {
                        post.calculateAverageRating();
                    })
                })
            }
        })


}