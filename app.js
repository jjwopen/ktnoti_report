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
}) // 메인 페이지(http://13.55.78.211:8080/)에 접속 시 HTML 파일 전송
app.get("/notis", mongoDB.getNotis); // /notis에 접속 시 DB에 있는 데이터 전송
app.post("/notis/post", mongoDB.createNoti); // /notis/post에 접속 시 DB에 데이터 업로드
app.put("/notis/:id", mongoDB.updateNoti); // /notis/:id에 PUT 요청 시 데이터 수정
app.delete("/notis/:id", mongoDB.deleteNoti); //notis/:id에 DELETE 요청 시 데이터 삭제

app.listen(8080, () => console.log("Server is running at 8080 ✨")); // 서버 시작