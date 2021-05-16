const controller = require("../controllers/follow.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/follow",
        [authJwt.verifyToken,],
        controller.submitFollow
    )

    app.get(
        "/api/follow",
        [authJwt.verifyToken,],
        controller.checkFollow
    )

    app.get(
        "/api/following",
        [authJwt.verifyToken,],
        controller.checkFollowing
    )

}