const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
const express = require('express');
const cors = require('cors');
const { query } = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express()
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d02hkdv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
function run() {
    try {
        const DataCollention = client.db('assignment12').collection('alldata')
        const CatagoryCollention = client.db('assignment12').collection('catagory')
        const productCollention = client.db('assignment12').collection('product')
        const userCollention = client.db('assignment12').collection('user')

        app.get('/alldata', async (req, res) => {
            const query = {}
            const data = await DataCollention.find(query).toArray()
            res.send(data)
        })
        app.delete('/alldata/:id', async (req, res) => {
            const id = req.params.id
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await DataCollention.deleteOne(query)
            res.send(result)
        })

        app.get('/alldata/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectID(id) }
            const result = await DataCollention.findOne(query)
            res.send(result)
        })
        app.post('/user', async (req, res) => {
            const data = req.body
            const result = await userCollention.insertOne(data)
            res.send(result)
        })
        app.get('/user', async (req, res) => {
            const query = {}
            const result = await userCollention.find(query).toArray()
            res.send(result)
        })
        app.get('/alldatas', async (req, res) => {
            let query = {}
            if (req.query.catagory) {
                query = {
                    catagory: req.query.catagory
                }
            }
            const result = await DataCollention.find(query).toArray()
            res.send(result)
        });
        app.get('/catagory', async (req, res) => {
            const query = {}
            const data = await CatagoryCollention.find(query).toArray()
            res.send(data)
        })

        app.post('/product', async (req, res) => {
            const data = req.body
            console.log(data);
            const result = await DataCollention.insertOne(data)
            res.send(result)
        })




    }
    finally {

    }
}
run()




app.get('/', (req, res) => {
    res.send('Assignment 12 server is running')
})

app.listen(port, () => {
    console.log(`Assignment 12 server running on ${port}`);
})