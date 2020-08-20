const {
  MongoClient
} = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  useUnifiedTopology: true
});

async function run() {
  try {
    await client.connect();

    const database = client.db('fruitsDB');
    const collection = database.collection('fruits');
    console.log("Connected successfully to the server.");
    const fruitsDocument = [{
        name: "Strawberry",
        score: 5,
        review: "Great fruit"
      },
      {
        name: "Watermelon",
        score: 10,
        review: "Kinda sour"
      },
      {
        name: "Pear",
        score: 3,
        review: "Great stuff!"
      }
    ];

//find documents
    const cursor = await collection.find();
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    await cursor.forEach(console.dir);
    // Query for a fruit that has the name 'Banana'
    // const query = { name: 'Banana' };
    // const cursor = await collection.find(query);

//insert new documents
    // const result = await collection.insertMany(fruitsDocument, options);
    // console.log(`${result.insertedCount} documents were inserted`);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
