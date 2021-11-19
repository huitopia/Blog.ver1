const mongoose = require("mongoose");
// mongoose 에서 Schema 가져옴
const { Schema } = mongoose;
// Schema 새로 생성
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    pw: {
        type: Number,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post", postSchema);