const db = require("../models");
const Tag = db.Tag;

const findByIdOrName = async (req) => {

    let tag = null;

    if(req.body.id !== undefined) {
        await Tag.findByPk(req.body.id)
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

    if((req.body.name === undefined || req.body.name.length === 0)
        && (req.body.id === undefined)) {
        res.status(400).send({
            message: "Paramètres id et name manquants"
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

    if((req.body.name === undefined || req.body.name.length === 0)
        && (req.body.id === undefined)) {
        res.status(400).send({
            message: "Paramètres id et name manquants"
        });
        return;
    }

    const tag = await findByIdOrName(req);

    if(tag) {
        tag.getPosts()
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
        order: [["count", "DESC"]]
    }).then((tags) => {
        res.status(200).send(tags);
    })
}