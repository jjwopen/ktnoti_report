const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = "MongoDB Private Key";
const dbName = "KakaotalkNotiDB";
const client = new MongoClient(url);

// DB에 연결하기
const connectDB = async () => {
    await client.connect();
    console.log('Connected successfully to database');
    // await console.log(client.db(dbName));
    return client.db(dbName);
}

const db = connectDB();

// DB 데이터 불러오기
const getNotis = async (req, res) => {
    try {
        const collection = (await db).collection("notis");
        const notis = await collection.find().toArray();
        res.json(notis);
    } catch (error) {
        return res.json({ message: "GET Failed." });

    }
};

// DB에 데이터 저장하기
const createNoti = async (req, res) => {
    try {
        const collection = (await db).collection("notis");
        const result = await collection.insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        return res.json({ message: "POST Failed." });
    }
}

// DB 데이터 수정하기
const updateNoti = async (req, res) => {
    try {
        const collection = (await db).collection('notis');
        const {id} = req.params;
        const updateData = req.body;

        const result = await collection.updateOne(
            {_id: new ObjectId(id)},
            {$set: updateData}
        );
        res.status(200).json(result);
    } catch (error) {
        return res.json({message: "PUT Failed."});
    }
}

// DB 데이터 삭제하기
const deleteNoti = async (req, res) => {
    try {
        const collection = (await db).collection('notis');
        const {id} = req.params;

        const result = await collection.deleteOne({_id: new ObjectId(id)});

        res.status(200).json(result);
    } catch (error) {
        return res.json({message: "DELETE Failed."});
    }
}

module.exports = {
    getNotis: getNotis,
    createNoti: createNoti,
    updateNoti: updateNoti,
    deleteNoti: deleteNoti
};
