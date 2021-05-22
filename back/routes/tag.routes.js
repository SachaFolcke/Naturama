const controller = require("../controllers/tag.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/tag",
        [authJwt.verifyToken,],
        controller.getTag
    )
    app.get(
        "/api/tag/top",
        [authJwt.verifyToken,],
        controller.getTopTags
    )
    app.get(
        "/api/tag/posts",
        [authJwt.verifyToken,],
        controller.getPostsByTag
    )
}