const db = require("../models");
const Tag = db.Tag;
const Profile = db.Profile;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const findByIdOrName = async (req) => {

    let tag = null;

    if(req.query.id !== undefined) {
        await Tag.findByPk(req.query.id)
            .then((result) => {tag = result;})
    }
    else {
        await Tag.findOne({
            where: {
                name: req.body.name
            }
        }).then((result) => {tag = result;})
    }

    return tag;
}

exports.getTag = async (req, res) => {

    if(req.query.id === undefined || req.query.id === null) {
        res.status(400).send({
            message: "Paramètre id manquant"
        });
        return;
    }

    const tag = await findByIdOrName(req);

    console.log(tag)
    if(tag) {
        res.status(200).send(tag)
    } else {
        res.status(404).send({
            message: "Tag introuvable"
        })
    }
}

exports.getPostsByTag = async (req, res) => {

    if(req.query.id === undefined || req.query.id === null) {
        res.status(400).send({
            message: "Paramètre id manquant"
        });
        return;
    }

    const tag = await findByIdOrName(req);

    if(tag) {
        tag.getPosts({
            include: [{
                model: Profile
            }, {
                model: Tag
            }],
            order: [["date", "DESC"]]
        })
            .then((posts) => {
                res.status(200).send(posts)
            })
    } else {
        res.status(404).send({
            message: "Tag introuvable"
        })
    }
}

exports.getTopTags = (req, res) => {

    Tag.findAll({
        limit: req.body.number || 5,
        order: [["count", "DESC"]],
        where: {
            count: {
                [Op.gt] : 0
            }
        }
    }).then((tags) => {
        res.status(200).send(tags);
    })
}