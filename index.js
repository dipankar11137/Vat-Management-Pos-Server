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

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    // console.log("database connect");

    const productCollection = client
      .db('vat_management')
      .collection('products');
    const bookProductCollection = client
      .db('vat_management')
      .collection('bookings');

    //   // // // // // // // // // // // //

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
    app.get('/allProduct/:id', async (req, res) => {
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

    // // booking Product

    app.post('/booking', async (req, res) => {
      const postResult = req.body;
      const result = await bookProductCollection.insertOne(postResult);
      res.send(result);
    });
    // // // get product filter by category
    // app.get('/products/:category', async (req, res) => {
    //   const category = req.params.category;
    //   const query = { category };
    //   const cursor = productCollection.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });
    // // get product by id
    // app.get('/product/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await productCollection.findOne(query);
    //   res.send(result);
    // });
    // // // restock Product item and update
    // app.put('/productId/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const updateQuantity = req.body;
    //   const query = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       quantity: updateQuantity.quantity,
    //     },
    //   };
    //   const result = await productCollection.updateOne(
    //     query,
    //     updateDoc,
    //     options
    //   );
    //   res.send(result);
    // });
    // // // Delete one product
    // app.delete('/product/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await productCollection.deleteOne(query);
    //   res.send(result);
    // });

    // //                     Buy    //
    // // post buy
    // app.post('/buyProducts', async (req, res) => {
    //   const postResult = req.body;
    //   const result = await buyProductCollection.insertOne(postResult);
    //   res.send(result);
    // });
    // // // get buy products
    // app.get('/buyProducts', async (req, res) => {
    //   const query = {};
    //   const cursor = buyProductCollection.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });
    // // get by product by id
    // app.get('/buyProductId/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await buyProductCollection.findOne(query);
    //   res.send(result);
    // });
    // // // get buy filter by email
    // app.get('/buyProduct/:email', async (req, res) => {
    //   const email = req.params.email;
    //   const query = { email };
    //   const cursor = buyProductCollection.find(query);
    //   const user = await cursor.toArray();
    //   res.send(user);
    // });
    // // //  buy product update payment
    // app.put('/buyProductPayment/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const updatePayment = req.body;
    //   const query = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       payment: updatePayment.payment,
    //     },
    //   };
    //   const result = await buyProductCollection.updateOne(
    //     query,
    //     updateDoc,
    //     options
    //   );
    //   res.send(result);
    // });
    // // product buy update delivered
    // app.put('/buyDelivered/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const updateDelivered = req.body;
    //   const query = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       delivered: updateDelivered.delivered,
    //     },
    //   };
    //   const result = await buyProductCollection.updateOne(
    //     query,
    //     updateDoc,
    //     options
    //   );
    //   res.send(result);
    // });

    // // Delete Buy Product
    // app.delete('/buyProduct/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await buyProductCollection.deleteOne(query);
    //   res.send(result);
    // });

    // //                       contact     //
    // // post contact
    // app.post('/contact', async (req, res) => {
    //   const postResult = req.body;
    //   const result = await contactCollection.insertOne(postResult);
    //   res.send(result);
    // });

    // // Get all contact
    // app.get('/contact', async (req, res) => {
    //   const query = {};
    //   const cursor = contactCollection.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    // // Delete Buy contact
    // app.delete('/contact/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await contactCollection.deleteOne(query);
    //   res.send(result);
    // });
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
