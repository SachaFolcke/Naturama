const controller = require("../controllers/post.controller");
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
        "/api/post/:id",
        [authJwt.verifyToken,],
        controller.getPost
    )

    app.get(
        "/api/profile/:id/posts",
        [authJwt.verifyToken,],
        controller.getAllPosts
    )

    app.get(
        "/api/timeline",
        [authJwt.verifyToken,],
        controller.getInterestingPosts
    )

    app.post(
        "/api/post",
        [authJwt.verifyToken,],
        controller.postPost
    )

    app.delete(
        "/api/post/:id",
        [authJwt.verifyToken,],
        controller.deletePost
    )
};