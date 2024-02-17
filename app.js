const express = require('express');
const postRouter = require('./routes/post');

const app = express();

app.get('/', (req, res) => {
  res.send('hello express');
});

// 게시글
app.use('/post', postRouter);

postRouter.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello1' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

app.listen(3065, () => {
  console.log('서버 실행 중');
});
