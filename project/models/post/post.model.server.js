/**
 * Created by Ben on 6/13/16.
 */

module.exports = function (projectDB) {
    var PostSchema = require("./post.schema.server.js")();
    var Post = projectDB.model("Post", PostSchema);

    var api = {
        createPost: createPost,
        findPostsByUser: findPostsByUser,
        findPostById: findPostById,
        findAllPosts: findAllPosts,
        search: search,
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

    function findAllPosts() {
        return Post.find();
    }

    function search(searchText) {
        return Post.find({$or: [
                        {'name': {$regex:searchText, $options:'i'}},
                        {'description': {$regex:searchText, $options:'i'}},
                        {'url': {$regex:searchText, $options:'i'}}]
                    });
    }

    function updatePost(postId, post) {
        return Post.update({_id: postId}, {$set: post});
    }

    function deletePost(postId) {
        return Post.remove({_id: postId});
    }
};