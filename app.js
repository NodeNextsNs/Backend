const express = require('express');
const cors = require('cors');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const db = require('./models');
const app = express();

// 서버 연결하면서 db, 시퀄라이즈 연결
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

// [CORS error] 모든 브라우저에서 api 사용 허용
app.use(
  cors({
    origin: '*',
  })
);
// url 로 보낸 데이터를 json 형식으로, form 형식으로 온 데이터를 처리
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중!');
});
