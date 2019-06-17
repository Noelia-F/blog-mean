const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const User = require('../models/users');
const { check, validationResult } = require('express-validator/check');

router.get('/', (req, res) => {
    Posts.find((err, posts) => {
        res.render('posts/index', {
            posts: posts
        })
    })
});

router.get('/published', (req, res)=> {
    Posts.published((err, posts) => {
        if(err) return res.json({error: err})
        res.render('posts/index', {
            posts: posts
        })
    })
});

router.get('/createanuser', (req, res) => {
    Posts.published((err, posts) => {
        if(err) return err.send('error')
        let user = new User()
        user.userName = 'Noe'
        user.pasword = '123456',
        posts.forEach(post => user.posts.push(post))
        user.save(err => {
            if(err) return console.log(err)
            res.json(user)
        })
    })
})

router.get('/new', (req, res) => {
    User.find((err, usersList) => {
        res.render('posts/new', {users: usersList})
    })
})

// posts

router.post('/create', [
    check('title', 'Debes poner un título a tu post').not().isEmpty(),
    check('content', 'Debes tener contenido en tu post').not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    req.body.published = req.body.published === 'on' ? true : false;

    Posts.create(req.body, (err, post) => {
        if(err) return res.json({error: err})
        res.redirect('/posts/');
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

router.get('/delete/:postId', (req, res) => {
    Posts.findByIdAndDelete(req.params.postId, (err, post) => {
        if(err) return res.json({error: err})
        res.redirect('/posts/');
    })
});

router.post('/edit/:postId', (req, res) => {
    req.body.published = req.body.published === 'on' ? true : false;
    Posts.findByIdAndUpdate(req.params.postId, req.body, {new: true}, (err, post) => {
            if(err) return res.json({error: err});
            res.redirect('/posts/');
        })
});
module.exports = router;