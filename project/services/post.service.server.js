/**
 * Created by Ben on 6/13/16.
 * Allows for post CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var postModel = models.postModel;

    /* Paths that are allowed. */
    app.post("/project/api/user/:userId/post", createPost);
    app.get("/project/api/user/:userId/post", findPostsByUser);
    app.get("/project/api/post/:postId", findPostById);
    app.get("/project/api/post/", findAllPosts);
    app.get("/project/api/post/search/:text", search);
    app.put("/project/api/post/:postId", updatePost);
    app.delete("/project/api/post/:postId", deletePost);

    /* Functions */
    function createPost(req, resp) {
        var newPost = req.body;
        var userId = req.params["userId"];

        postModel
            .createPost(userId, newPost)
            .then(
                function (post) {
                    resp.json(post);
                },
                function (error) {
                    resp.status(400).send("Post creation failed.");
                }
            );
    }

    function findPostsByUser(req, resp) {
        var userId =  req.params["userId"];

        postModel
            .findPostsByUser(userId)
            .then(
                function (post) {
                    resp.json(post);
                },
                function (error) {
                    resp.status(400).send("User with id: " + userId + " has no posts.");
                }
            );
    }

    function findPostById(req, resp) {
        var postId =  req.params["postId"];

        postModel
            .findPostById(postId)
            .then(
                function (post) {
                    resp.json(post);
                },
                function (error) {
                    resp.status(400).send("Post with id: " + postId + " not found.");
                }
            );
    }

    function findAllPosts(req, resp) {
        postModel
            .findAllPosts()
            .then(
                function (posts) {
                    resp.json(posts);
                },
                function (error) {
                    resp.status(400).send(error);
                }
            );
    }

    function search(req, resp) {
        var searchText = req.params["text"];

        postModel
            .search(searchText)
            .then(
                function (posts) {
                    resp.json(posts);
                },
                function (err) {
                    resp.status(400).send(err);
                }
            );
    }

    function updatePost(req, resp) {
        var postId =  req.params["postId"];
        var newPost = req.body;
        delete newPost['_id'];

        postModel
            .updatePost(postId, newPost)
            .then(
                function (post) {
                    resp.json(post);
                },
                function (error) {
                    resp.status(400).send("Post with id: " + postId + " not found.");
                }
            );
    }

    function deletePost(req, resp) {
        var postId =  req.params["postId"];

        postModel
            .deletePost(postId)
            .then(
                function (post) {
                    resp.json(post);
                },
                function (error) {
                    resp.status(400).send("Post with id: " + postId + " not found.");
                }
            );
    }
};