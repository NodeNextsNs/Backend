const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();

// POST /user/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.err(err);
      next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.json(user);
    });
  })(req, res, next);
});

// POST /user/logout
router.post('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('로그아웃 성공');
});

// POST /user
router.post('/', async (req, res) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    res.status(201).send('축하합니다. 회원가입이 되었습니다.');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
