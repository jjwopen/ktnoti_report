const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = "MongoDB Private Key";
const dbName = "KakaotalkNotiDB";
const client = new MongoClient(url);

const connectDB = async () => {
    await client.connect();
    console.log('Connected successfully to database');
    // await console.log(client.db(dbName));
    return client.db(dbName);
}

const db = connectDB();

const getNotis = async (req, res) => {
    try {
        const collection = (await db).collection("notis");
        const notis = await collection.find().toArray();
        res.json(notis);
    } catch (error) {
        return res.json({ message: "GET Failed." });

    }
};

const createNoti = async (req, res) => {
    try {
        const collection = (await db).collection("notis");
        const result = await collection.insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        return res.json({ message: "POST Failed." });
    }
}

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
