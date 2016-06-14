/**
 * Created by Ben on 6/13/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var PostSchema = require("./post.schema.server.js")();
    var Post = mongoose.model("Post", PostSchema);

    var api = {
        createPost: createPost,
        findPostsByUser: findPostsByUser,
        findPostById: findPostById,
        updatePost: updatePost,
        deletePost: deletePost
    };
    return api;

    function createPost(userId, post) {
        post._user =  userId;
        return Post.create(post);
    }

    function findPostsByUser(userId) {
        return Post.find({_user: userId});
    }

    function findPostById(postId) {
        return Post.findById(postId);
    }

    function updatePost(postId, post) {
        return Post.update({_id: postId}, {$set: post});
    }

    function deletePost(postId) {
        return Post.remove({_id: postId});
    }
};