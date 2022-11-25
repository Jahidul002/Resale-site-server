const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
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

        app.get('/alldata', async (req, res) => {
            const query = {}
            const data = await DataCollention.find(query).toArray()
            res.send(data)
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