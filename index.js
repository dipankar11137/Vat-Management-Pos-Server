const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());


const uri =
  'mongodb+srv://vat_management:U9zN7Q47bHvQQNz0@cluster0.kpvnuu1.mongodb.net/?retryWrites=true&w=majority';

// const uri =
  // 'mongodb+srv://masterdrunken846:QONP1aSOWNNnbQfy@cluster0.vo8cjkf.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    // console.log("database connect");
   const userCollection = client.db('vat_management').collection('user');
    const productCollection = client
      .db('vat_management')
      .collection('products');
    const bookProductCollection = client
      .db('vat_management')
      .collection('bookings');
    const buyProductCollection = client.db('vat_management').collection('buys');
    const updateProductCollection = client
      .db('vat_management')
      .collection('updateProducts');

    //   // // // // // // // // // // // //
    // // post User
    //create and update a user
    app.put('/create-user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;

      const filter = { email: email };
      const options = { upsert: true };

      const updatedDoc = {
        $set: user,
      };

      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );

      res.send(result);
    });

    // get all user
    app.get('/user', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const newCollection = await cursor.toArray();
      res.send(newCollection);
    });

    // // //                     product   //
    // // post product
    app.post('/allProduct', async (req, res) => {
      const postResult = req.body;
      const result = await productCollection.insertOne(postResult);
      res.send(result);
    });
    // // get products
    app.get('/allProduct', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // // get product by id
    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });
    // restock product item and update
    app.put('/productId/:id', async (req, res) => {
      const id = req.params.id;
      const updateQuantity = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: updateQuantity.quantity,
        },
      };
      const result = await productCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    // // Delete one product
    app.delete('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });
    // // get product by id
    app.get('/allProducts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { pId: id };
      const result = await productCollection.findOne(query);
      res.send(result);
    });
    // // Delete all product
    app.delete('/productDelete', async (req, res) => {
      const result = await productCollection.deleteMany(query);
      res.send(result);
    });

    // // update Product

    app.post('/updateProduct', async (req, res) => {
      const postResult = req.body;
      const result = await updateProductCollection.insertOne(postResult);
      res.send(result);
    });
    //  get update Product
    app.get('/updateProduct', async (req, res) => {
      const query = {};
      const cursor = updateProductCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // // booking Product

    app.post('/bookings', async (req, res) => {
      const postResult = req.body;
      const result = await bookProductCollection.insertOne(postResult);
      res.send(result);
    });
    // // get booking products
    app.get('/booking', async (req, res) => {
      const query = {};
      const cursor = bookProductCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // Delete all book
    app.delete('/bookings', async (req, res) => {
      const result = await bookProductCollection.deleteMany();
      res.send(result);
    });
    // Delete one book  Product
    app.delete('/booking/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookProductCollection.deleteOne(query);
      res.send(result);
    });
    // buy information
    app.post('/buys', async (req, res) => {
      const postResult = req.body;
      const result = await buyProductCollection.insertOne(postResult);
      res.send(result);
    });
    // // get booking products
    app.get('/buys', async (req, res) => {
      const query = {};
      const cursor = buyProductCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running Vat Management Pos Server');
});

app.listen(port, () => {
  console.log('Vat Management Pos Server is running ');
});
