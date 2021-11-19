const express = require('express')
const app = express()
const port = 3000
const Memo = require("./schemas/post")

// 미들웨어
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// static 정적 파일 제공
app.use(express.static('public'))

// schema 연결
const connect = require('./schemas')
connect();

// post.js에 있는 router 파일 가져옴
const MemoRouter = require("./routers/post")
// app에 등록
app.use("/api", [MemoRouter])

// view 경로
app.set('views', __dirname + '/views');
// view engine으로 ejs 사용 명시
app.set('view engine', 'ejs');

// view 폴더 파일 연결
app.get('/', (req, res) => {
    res.render('index');
})
// post 페이지 연결
app.get('/post', (req, res) => {
    res.render('post');
})
// update 페이지 연결
app.get('/update', (req, res) => {
    res.render('update');
})

// detail 페이지 연결
app.get('/detail/:_id', async (req, res) => {
    const { _id } = req.params;
    const memo = await Memo.findOne({ _id });
    res.render('detail', { memo });
})

app.get('/update/:_id', async (req, res) => {
    const { _id } = req.params;
    const memo = await Memo.findOne({ _id });
    res.render('update', { memo });
})

app.patch('/update/:_id', async (req, res) => {
    const { title, nickName, pw, contents} = req.body;
    const { _id } = req.params;
    await Memo.updateOne({ _id }, { $set: { title:title, nickName:nickName, pw:pw, contents:contents } })
    res.json({ msg: 'update OK' })
})

app.delete('/update/:_id', async (req, res) => {
    const { _id } = req.params;
    await Memo.deleteOne({ _id })
    res.json({ msg: 'delete OK' })
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})