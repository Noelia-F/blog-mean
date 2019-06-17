const express = require('express');
const router = express.Router();
const Posts = require('../../models/posts');
const middleware = require('../middleware');

router.use(middleware.checkAuth);

router.get('/', (req, res) => {
    Posts.find((err, posts) => {
        if(err) return res.status(500).json({error: err});
        res.json(posts);
    })
});

router.get('/:postId', (req, res) => {
    Posts
        .findById(req.params.postId)
        .populate('user')
        .exec((err, post) => {
            res.render('posts/detail', {
                post: post
            })
        })
});

router.post('/', (req, res) => {
    Posts.create(req.body, (err, posts) => {
        if(err) return res.json({error: err});
        res.json(posts)
    })
});

module.exports = router;