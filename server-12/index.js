const express = require('express');
const app = express();
const cors = require('cors');
const { ObjectId } = require('mongodb');

require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluste1.8blfyfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluste1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const postCollection = client.db('Edumanage').collection('Instructors');
    const posCollection = client.db('Edumanage').collection('Posts');
    const menuCollection = client.db("Edumanage").collection("classes");
    const paymentCollection = client.db("Edumanage").collection("payment");
    const partnersCollection = client.db("Edumanage").collection("partners");
    const assignmentCollection = client.db("Edumanage").collection("assignments");
    const feedbackCollection = client.db("Edumanage").collection("feedback");
    const submittedassignmentCollection = client.db("Edumanage").collection("submittedassignments");
    const reviewCollection = client.db("bistroDb").collection("reviews");

    app.get('/classes', async(req, res) =>{
        const result = await menuCollection.find().toArray();
        res.send(result);
    })
    
    app.get('/reviews', async(req, res) =>{
        const result = await reviewCollection.find().toArray();
        res.send(result);
    })

    app.post('/addPost', async (req, res) => {
      const newPost = req.body;
      console.log(newPost);
      const result = await postCollection.insertOne(newPost);
      res.send(result);
  });
  app.post('/addassignment', async (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    const result = await assignmentCollection.insertOne(newPost);
    res.send(result);
});

app.post('/addclasses', async (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    const result = await menuCollection.insertOne(newPost);
    res.send(result);
});
app.post('/feedback', async (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    const result = await feedbackCollection.insertOne(newPost);
    res.send(result);
});
app.get('/feedback', async (req, res) => {
    const cursor = feedbackCollection.find();
    const result = await cursor.toArray();
    res.send(result);
});
app.get('/partners', async (req, res) => {
    const cursor = partnersCollection.find();
    const result = await cursor.toArray();
    res.send(result);
});

app.post('/submittedassignments', async (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    const result = await submittedassignmentCollection.insertOne(newPost);
    res.send(result);
});
app.post('/payment', async (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    const result = await paymentCollection.insertOne(newPost);
    res.send(result);
});
  app.get('/allireq', async (req, res) => {
    const cursor = postCollection.find();
    const result = await cursor.toArray();
    res.send(result);
});

      app.get('/post/:id', async (req, res) => {
          const postId = req.params.id;
          console.log('ID', postId);
          const query = { _id: new ObjectId(postId) };
          const result = await menuCollection.findOne(query);
          res.send(result);
      });


    app.get('/classes/:id', async (req, res) => {
        const postId = req.params.id;
        console.log('ID', postId);
        const query = { _id: new ObjectId(postId) };
        const result = await menuCollection.findOne(query);
        res.send(result);
    });

    app.get('/payment', async (req, res) => {
        const result = await paymentCollection.find().toArray();
        res.send(result);
    });
    app.get('/assignments/:cid', async (req, res) => {
        const postId = req.params.cid;
        console.log('ID', postId);
        const query = { classId: (postId) };
        const result = await assignmentCollection.findOne(query);
        res.send(result);
    });


app.put('/classes/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedPostData = req.body;

  // Define the update operation
  const updateOperation = {
      $set: {
          image: updatedPostData.image,
          title: updatedPostData.title,
          price: updatedPostData.price,
          description: updatedPostData.description,
          userEmail: updatedPostData.userEmail,
          userName: updatedPostData.userName
      }
  };

  try {
      // Perform the update operation
      const result = await menuCollection.updateOne(filter, updateOperation);

      // Check if the update was successful
      if (result.matchedCount > 0) {
          res.json({ matchedCount: result.matchedCount });
      } else {
          res.status(404).json({ error: 'Post not found' });
      }
  } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


      app.delete('/delPost/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          console.log('delete: ');
          const result = await menuCollection.deleteOne(query);
          res.send(result);
      });



app.put('/allireqa/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { rid: id, status: 'pending' }; // Ensure status is pending
  const options = { upsert: true };
  const updatedPost = req.body;
  const post = {
      $set: {  
          status : 'approved', // Set status to 'approved'
      }
  }
  try {
      const result = await postCollection.updateOne(filter, post, options);
      if (result.modifiedCount === 0) {
          return res.status(404).json({ message: 'No pending request found with the provided ID' });
      }
      res.json(result);
  } catch (error) {
      console.error('Error updating teacher request:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/allireqr/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { rid: id, status: 'pending' }; // Ensure status is pending
  const options = { upsert: true };
  const updatedPost = req.body;
  const post = {
      $set: {  
          status : 'rejected', // Set status to 'approved'
      }
  }
  try {
      const result = await postCollection.updateOne(filter, post, options);
      if (result.modifiedCount === 0) {
          return res.status(404).json({ message: 'No pending request found with the provided ID' });
      }
      res.json(result);
  } catch (error) {
      console.error('Error updating teacher request:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/allclassreq/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id), status: 'pending' }; // Ensure status is pending
    const options = { upsert: true };
    const updatedPost = req.body;
    const post = {
        $set: {  
            status : 'approved', // Set status to 'approved'
        }
    }
    try {
        const result = await menuCollection.updateOne(filter, post, options);
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'No pending request found with the provided ID' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error updating teacher request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.put('/allclassreq/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id), status: 'pending' }; // Ensure status is pending
    const options = { upsert: true };
    const updatedPost = req.body;
    const post = {
        $set: {  
            status : 'rejected', // Set status to 'approved'
        }
    }
    try {
        const result = await menuCollection.updateOne(filter, post, options);
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'No pending request found with the provided ID' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error updating teacher request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('boss is sitting')
})

app.listen(port, () => {
    console.log(`Edumanage is sitting on port ${port}`);
})