const express = require("express");
const app = express();
const cors = require('cors');
const mongoDB = require("./database/mongo");

app.use(cors({ // CORS 보안 정책 오류 해결
    origin: '*',
    credential: true,
}))
app.use(express.json());
app.use(express.static('src'));
app.use(express.static('public'));

app.get("/", (req, res)  => {
    res.sendFile(__dirname + "/noti.html")
}) // 메인 페이지(http://13.55.78.211:8080/)에 접속 시 HTML 파일 전송(GET)
app.get("/notis", mongoDB.getNotis); // /notis에 접속 시 DB에 있는 데이터 전송(GET)
app.post("/notis/post", mongoDB.createNoti); // /notis/post에 게시 요청 시 DB에 데이터 업로드(POST)
app.put("/notis/:id", mongoDB.updateNoti); // /notis/:id에 수정 요청 시 데이터 수정(PUT)
app.delete("/notis/:id", mongoDB.deleteNoti); //notis/:id에 삭제 요청 시 데이터 삭제(DELETE)

app.listen(8080, () => console.log("Server is running at 8080 ✨")); // 서버 시작
