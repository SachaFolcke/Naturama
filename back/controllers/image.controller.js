const db = require("../models");
const Image = db.Image;
const path = require('path');
const appRoot = path.dirname(require.main.filename);

// TODO: Vérifier les accès avec visibility
exports.getImage = (req, res) => {

    Image.findByPk(req.params.id).then((image) => {
            if (image) {
                res.status(200).sendFile(`${appRoot}/uploads/${image.img_src}`)
            } else {
                res.status(404).send({
                    message: "Image introuvable"
                })
            }
        }
    )
}