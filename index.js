const express = require('express') // express 모듈을 가지고온다
const app = express() // 펑션을 이용해서 새로운 앱을 생성 
const port = 4000 // 포트

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kyungwon:abcd1234@boilerplate.dg2la.mongodb.net/boilerplate?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => { // 루트 디렉토리에 Hello world를 실행
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})