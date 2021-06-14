const express = require('express'); // express 모듈을 가지고온다
const app = express(); // 펑션을 이용해서 새로운 앱을 생성 
const port = 5000 // 포트
const bodyParser = require("body-parser")

const config = require('./config/key')

const { User } = require('./models/User');

 // application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: true}))
 // application/json
  app.use(bodyParser.json())

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})