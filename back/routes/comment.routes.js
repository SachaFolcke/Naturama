const controller = require("../controllers/comment.controller");
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
        "/api/post/:id/comment",
        [authJwt.verifyToken],
        controller.postComment
    );

    app.delete(
        "/api/comment/:id",
        [authJwt.verifyToken],
        controller.deleteComment
    );

    app.get(
        "/api/post/:id/comments",
        [authJwt.verifyToken],
        controller.getPostComments
    );
}