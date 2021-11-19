const { Router } = require("express");
const express = require("express");
const Memos = require("../schemas/post");

const router = express.Router();

router.get("/memos", async (req, res) => {
    const { date } = req.query;
    const memos = await Memos.find({ date }).sort("-date");
    res.json(memos);
})

router.post("/memos", async (req, res) => {
    const { title, nickName, pw, contents, date } = req.body;
    await Memos.create({ title: title, nickName: nickName, pw: pw, contents: contents, date: date})
    res.send({result: "success"})
})

module.exports = router;