const express = require('express');

const { Post } = require('../models');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

//POST /post

router.post('/', isLoggedIn, async (req, res) => {
  try {
    await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST /post/:post.id/comment
router.delete('/:postId/comment', isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
