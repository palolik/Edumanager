// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const app = express();
// const port = process.env.PORT || 5000;

// // middleware
// // app.use(cors({
// //     origin: `https://samia-11824.web.app`
// // }));
// app.use(cors({
//     origin: ['http://localhost:5173', 'http://localhost:5174','https://samia-11824.web.app'],
//     credentials: true
// }));
// app.use(express.json());
// //prottoy2441139
// //PCcEnjG5yyVwyxIw

// // console.log(process.env.EMAILDB)
// const uri = `mongodb+srv://${process.env.EMAILDB}:${process.env.PASSDB}@cluster0.fagav7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {

//       const client = new MongoClient(uri, {
//           serverApi: {
//               version: ServerApiVersion.v1,
//               strict: true,
//               deprecationErrors: true,
//           }
//       });

//       await client.connect();

//       const postCollection = client.db('PostsmanDB').collection('Posts')
//       const ValunteerCollection = client.db('PostsmanDB').collection('Valunteer')
//       const categoryCollection = client.db('PostsmanDB').collection('categoryPosts')

  
//       app.get('/', (req, res) => {
//           res.send('Simple CRUD is running');
//       });

     
//       app.get('/allData', async (req, res) => {
//           const post = postCollection.find().sort({ Dead_line: 1 });
//           const category = categoryCollection.find();
//           const postResult = await post.toArray();
//           const categoryResult = await category.toArray();
//           const result = { categoryResult, postResult };
//           res.send(result);
//       });


  
//       app.get('/allPosts', async (req, res) => {
//         const cursor = postCollection.find(); // Sort by Dead_line field in ascending order
//         const result = await cursor.toArray();
//         res.send(result);
//     });

     
//       app.get('/allPosts/a', async (req, res) => {
//           const cursor = postCollection.find().sort({rating:1});
//           const result = await cursor.toArray();
//           res.send(result);
//       });
     
//       app.get('/allPosts/d', async (req, res) => {
//           const cursor = postCollection.find().sort({rating:-1});
//           const result = await cursor.toArray();
//           res.send(result);
//       });

      
//       app.get('/post/:id', async (req, res) => {
//           const postId = req.params.id;
//           console.log('ID', postId);
//           const query = { _id: new ObjectId(postId) };
//           const result = await postCollection.findOne(query);
//           res.send(result);
//       });
//       app.get('/post/:id', async (req, res) => {
//         const postId = req.params.id;
//         console.log('ID', postId);
//         const query = { _id: new ObjectId(postId) };
//         const result = await postCollection.findOne(query);
//         res.send(result);
//     });
      
    
//       app.get('/myPost/:email', async (req, res) => {
//           const postEmail = req.params.email;
//           console.log('Email', postEmail);

//           const query = { userEmail: postEmail };
//           const cursor = postCollection.find(query);
//           const result = await cursor.toArray()
//           res.send(result);
//       });

//       app.get('/volunteer/:email', async (req, res) => {
//         const postEmail = req.params.email;
//         console.log('Email', postEmail);

//         const query = { userEmail: postEmail };
//         const cursor = ValunteerCollection.find(query);
//         const result = await cursor.toArray()
//         res.send(result);
//     });
     
//       app.get('/catagory/:subcategory_name', async (req, res) => {
//           const categoryId = req.params.subcategory_name;
//           console.log('category', categoryId);

//           const query = { subcategory_Name: categoryId };
//           const cursor = postCollection.find(query);
//           const result = await cursor.toArray()
//           res.send(result);
//       });
      
     
//       app.post('/addPost', async (req, res) => {
//           const newPost = req.body;
//           console.log(newPost);
//           const result = await postCollection.insertOne(newPost);
//           res.send(result);
//       });

//       app.post('/addValunteer', async (req, res) => {
//         const newValunteer = req.body;
//         console.log(newValunteer);
//         const result = await ValunteerCollection.insertOne(newValunteer);
//         res.send(result);
//     });

//       app.put('/post/:id', async (req, res) => {
//           const id = req.params.id;
//           const filter = { _id: new ObjectId(id) };
//           const options = { upsert: true };
//           const updatedPost = req.body;
//           const post = {
//               $set: {
             
//                    image : updatedPost.image,
//                    item_name : updatedPost.item_name,
//                    subcategory_Name : updatedPost.subcategory_Name,
//                    loca_tion : updatedPost.loca_tion,
//                    shortDescription : updatedPost.shortDescription,
//                    no_volunteer : updatedPost.no_volunteer,
//                    Dead_line : updatedPost.Dead_line,
//                    userEmail : updatedPost.userEmail,
//                    userName : updatedPost.userName,
//               }
//           }
//           const result = await postCollection.updateOne(filter, post, options);
//           res.send(result);
//       });

//       // delete entry by id
//       app.delete('/delPost/:id', async (req, res) => {
//           const id = req.params.id;
//           const query = { _id: new ObjectId(id) };
//           console.log('delete: ');
//           const result = await postCollection.deleteOne(query);
//           res.send(result);
//       });

//       app.delete('/delvolunteer/:id', async (req, res) => {
//         const id = req.params.id;
//         const query = { _id: new ObjectId(id) };
//         console.log('delete: ');
//         const result = await ValunteerCollection.deleteOne(query);
//         res.send(result);
//     });
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");


//       app.listen(port, () => {
//           console.log(`Server is running on port: ${port}`);
//       });

//   } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//   }
// }
// run().catch(console.dir);

