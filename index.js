const express = require('express'); // express 모듈을 가지고온다
const app = express(); // 펑션을 이용해서 새로운 앱을 생성 
const port = 5000 // 포트
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const config = require('./config/key')

const { User } = require('./models/User');

 // application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: true}))
 // application/json
  app.use(bodyParser.json())
  app.use(cookieParser());
 //app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => { // 루트 디렉토리에 Hello world를 실행
  res.send('Hello World!~돈 많이 벌고 싶당')
})

 app.post('/register', (req, res) => {

   // 회원가입 라우터
   // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
   // 그것들을 데이터 베이스에 넣어준다.

     const user = new User(req.body)

     user.save((err, userInfo) => {
       if(err) return res.json({ success: false, err })
       return res.status(200).json({
         success: true
       })
     })
 })

 app.post('/login', (req, res) => {

  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  })
  // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인

  user.comparePassword(req.body.password, (err, isMatch) => {
    if(!isMatch)
      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
  // 비밀번호 까지 맞다면 토큰을 생성하기
    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);

      // 토큰을 저장한다. 쿠키, 로컬스토리지, 세션
      res.cookie("x_auth", user.token)
      .status(200)
      .json({ loginSuccess : true, userId: user._id})

    })

  })

 
 })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})