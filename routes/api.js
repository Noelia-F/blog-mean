const express = require('express');
const router = express.Router();

const usersApiRouter = require('./api/users');
const postsApiRouter = require('./api/posts');

router.use('/users', usersApiRouter);
router.use('/posts', postsApiRouter);

module.exports = router;