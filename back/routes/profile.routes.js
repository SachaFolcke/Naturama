const controller = require("../controllers/profile.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/profile/user/:id",
        [authJwt.verifyToken],
        controller.getProfileByUserId
    );

    app.get(
        "/api/profile/:id",
        [authJwt.verifyToken],
        controller.getProfile
    );
}