const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express()

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


// verify the token
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' })
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'unauthorized access' })
    }

    req.user = decoded
    next()
  })
}




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oi6ry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
    // Send a ping to confirm a successful connection


    const database = client.db('OorO')
    const userCollection = database.collection('users')
    const donationRequestCollection = database.collection('donationRequests');
    const blogCollection = database.collection('blogs')

    // verify the admin 
    const verifyAdmin = async (req, res, next) => {
      const email = req.user.email;
      const query = { email: email };
      const user = await userCollection.findOne(query)
      const isAdmin = user?.role === 'admin';

      if (!isAdmin) {
        return res.status(403).send({ message: 'forbidden access in verify admin' })
      }

      next();
    }

    const verifyAdminVolenteer = async (req, res, next) => {
      const email = req.user.email;
      const query = { email: email };
    
      try {
        const user = await userCollection.findOne(query);
        const isAdminOrVolunteer = user?.role === 'admin' || user?.role === 'volenteer';
    
        if (!isAdminOrVolunteer) {
          return res.status(403).send({ message: 'Forbidden access: Admin or Volunteer only' });
        }
    
        next();
      } catch (error) {
        console.error('Error verifying role:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    };
    



    // JWT
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: false

        })
        .send({ success: true })
    })

    app.post('/logout', async (req, res) => {
      res.
        clearCookie('token', {
          httpOnly: true,
          secure: false
        })
        .send({ success: true })
    })
    // get users
    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const status = req.query.status;

      let query = {};
      if (status === 'active') {
        query.isBlocked = false;
      } else if (status === 'blocked') {
        query.isBlocked = true;
      }

      const result = await userCollection.find(query).toArray();
      res.send(result);
    })

    // get only users who are donor
    app.get('/donors', verifyToken, verifyAdminVolenteer, async (req, res) => {
      const query = { role: 'donor' };
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });

    // add users
    app.post('/users', async (req, res) => {
      const user = req.body;
      // check if the email user exist or not
      const query = { email: user.email }
      const exitingUser = await userCollection.findOne(query)
      if (exitingUser) {
        return res.send({ message: 'user already exists', insertedId: null })
      }
      const result = await userCollection.insertOne(user);
      res.send(result)
    })

    // toggle user block status
    app.patch('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      // Fetch the user document to get the current isBlocked value
      const user = await userCollection.findOne(filter);

      if (!user) {
        return res.status(404).send('User not found');
      }

      const currentIsBlocked = user.isBlocked || false; // Default to false if undefined

      const updatedDoc = {
        $set: {
          isBlocked: !currentIsBlocked, // Toggle the value
        },
      };

      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // make user volenteer
    app.patch('/users/volenteer/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          role: 'volenteer'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    // make user admin
    app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })


    // check admin or not
    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.user.email) {
        return res.status(403).send({ message: 'unauthorized access' });
      }

      const user = await userCollection.findOne({ email });
      const isAdmin = user?.role === 'admin';
      res.send({ admin: isAdmin });
    });

    // check donor or not
    app.get('/users/donor/:email', verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.user.email) {
        return res.status(403).send({ message: 'unauthorized access' });
      }

      const user = await userCollection.findOne({ email });
      const isDonor = user?.role === 'donor';
      res.send({ donor: isDonor });
    });

    // check volenteer or not
    app.get('/users/volenteer/:email', verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.user.email) {
        return res.status(403).send({ message: 'unauthorized access' });
      }

      const user = await userCollection.findOne({ email });
      const isVolenteer = user?.role === 'volenteer';
      res.send({ volenteer: isVolenteer });
    });


    // get users sppecific profile
    app.get('/users/profile/:email', verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.user.email) {
        return res.status(403).send({ message: 'unauthorized access' });
      }

      try {
        const query = { email: email };
        const user = await userCollection.findOne(query);

        if (!user) {
          return res.status(404).json({ message: 'User not found in database' });
        }

        res.send(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: 'Failed to fetch user' });
      }
    });

    // update users profile
    app.patch('/users/profile/:email', verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.user.email) {
        return res.status(403).send({ message: 'unauthorized access' });
      }

      try {
        const filter = { email: email };
        const updatedDoc = {
          $set: req.body, // Assuming the request body contains the updated user data
        };

        const result = await userCollection.updateOne(filter, updatedDoc);

        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: 'User not found or no changes applied' });
        }

        res.send({ success: true, modifiedCount: result.modifiedCount });
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Failed to update user' });
      }
    });

    // delete users
    app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
      const { id } = req.params;

      try {
        const query = { _id: new ObjectId(id) };
        const user = await userCollection.findOne(query);

        if (!user) {
          return res.status(404).json({ message: 'User not found in database' });
        }


        const deleteResult = await userCollection.deleteOne(query);
        res.send({ success: true, deletedCount: deleteResult.deletedCount });

      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Failed to delete user' });
      }
    });

    // Donation Requests post
    app.post('/donationRequests', verifyToken, async (req, res) => {
      const user = req.user;
      if (!user) {
        return res.status(401).send({ message: 'unauthorized access' });
      }

      const requesterEmail = user.email;
      const query = { email: requesterEmail }
      const exitingUser = await userCollection.findOne(query)
      if (exitingUser?.isBlocked) {
        return res.status(403).send({ message: 'You are blocked from creating donation requests.' });
      }

      const donationRequest = req.body;

      try {
        const result = await donationRequestCollection.insertOne(donationRequest);
        console.log(result);
        res.send({ success: true, insertedId: result.insertedId });
      } catch (error) {
        console.error('Error creating donation request:', error);
        res.status(500).send({ message: 'Failed to create donation request.', error: error.message });
      }
    });

    // get all donation requests and status
    app.get('/allDonationRequests', verifyToken, verifyAdminVolenteer, async (req, res) => {
      const status = req.query.status;

      let query = {};
      if (status && status !== 'all') {
        query.donationStatus = status;
      }

      try {
        const result = await donationRequestCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error('Error fetching all donation requests:', error);
        res.status(500).send({ message: 'Failed to fetch all donation requests', error: error.message });
      }
    });


    // Get donation requests by email and status
    app.get('/donationRequests', verifyToken, async (req, res) => {
      const userEmail = req.query.email;
      const status = req.query.status;

      if (!userEmail) {
        return res.status(400).send({ message: 'Email is required' });
      }

      let query = { requesterEmail: userEmail };
      if (status && status !== 'all') {
        query.donationStatus = status;
      }

      try {

        const result = await donationRequestCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error('Error fetching donation requests:', error);
        res.status(500).send({ message: 'Failed to fetch donation requests', error: error.message });
      }
    });

    // Get specific donation request by ID
    app.get('/donationRequests/:id', async (req, res) => {
      const id = req.params.id;

      try {
        const donationRequest = await donationRequestCollection.findOne({ _id: new ObjectId(id) });
        if (!donationRequest) {
          return res.status(404).send({ message: 'Donation request not found' });
        }
        res.send(donationRequest);
      } catch (error) {
        console.error('Error fetching donation request:', error);
        res.status(500).send({ message: 'Failed to fetch donation request', error: error.message });
      }
    });

    // update donation request by ID
    app.put('/donationRequests/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const donationRequest = req.body;

      try {
        const result = await donationRequestCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: donationRequest }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).send({ message: 'Donation request not found' });
        }

        res.send({ success: true, modifiedCount: result.modifiedCount });
      } catch (error) {
        console.error('Error updating donation request:', error);
        res.status(500).send({ message: 'Failed to update donation request', error: error.message });
      }
    });


    // delete donation request by ID
    app.delete('/donationRequests/:id', verifyToken, async (req, res) => {
      const { id } = req.params;

      try {
        const query = { _id: new ObjectId(id) };
        const donationRequest = await donationRequestCollection.findOne(query);

        if (!donationRequest) {
          return res.status(404).json({ message: 'Donation Request not found in database' });
        }


        const deleteResult = await donationRequestCollection.deleteOne(query);
        res.send({ success: true, deletedCount: deleteResult.deletedCount });

      } catch (error) {
        console.error("Error deleting donation Request:", error);
        res.status(500).json({ message: 'Failed to delete user' });
      }
    });

    // update donation request status by ID
    app.patch('/donationRequests/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const { donationStatus } = req.body;

      try {
        const result = await donationRequestCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { donationStatus: donationStatus } }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).send({ message: 'Donation request not found' });
        }

        res.send({ success: true, modifiedCount: result.modifiedCount });
      } catch (error) {
        console.error('Error updating donation request status:', error);
        res.status(500).send({ message: 'Failed to update donation request status', error: error.message });
      }
    });


    // post blogs
    app.post('/blogs', async (req, res) => {
      const blogs = req.body;
      const result = await blogCollection.insertOne(blogs);
      res.send(result)
    })

    // get blogs
    app.get('/blogs', async (req, res) => {
      const result = await blogCollection.find().toArray();
      res.send(result);
    })

    // get blogs by id
    app.get('/blogs/:id', async (req, res) => {
      const id = req.params.id;

      try {
        const blogs = await blogCollection.findOne({ _id: new ObjectId(id) });
        if (!blogs) {
          return res.status(404).send({ message: 'blogs  not found' });
        }
        res.send(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send({ message: 'Failed to fetch blogs', error: error.message });
      }
    });

    // update blogs by id
    app.put('/blogs/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const blogs = req.body;

      try {
        const result = await blogCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: blogs }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).send({ message: 'blogs not found' });
        }

        res.send({ success: true, modifiedCount: result.modifiedCount });
      } catch (error) {
        console.error('Error updating blogs:', error);
        res.status(500).send({ message: 'Failed to update blogs', error: error.message });
      }
    });

    // update blogs status by id
    app.patch('/blogs/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;

      try {
        const result = await blogCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: status } }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).send({ message: 'blogs not found' });
        }

        res.send({ success: true, modifiedCount: result.modifiedCount });
      } catch (error) {
        console.error('Error updating blogs status:', error);
        res.status(500).send({ message: 'Failed to update blogs status', error: error.message });
      }
    });

    // DELETE BLOGS
    app.delete('/blogs/:id', verifyToken, verifyAdmin, async (req, res) => {
      const { id } = req.params;

      try {
        const query = { _id: new ObjectId(id) };
        const user = await blogCollection.findOne(query);

        if (!user) {
          return res.status(404).json({ message: 'blogs not found in database' });
        }


        const deleteResult = await blogCollection.deleteOne(query);
        res.send({ success: true, deletedCount: deleteResult.deletedCount });

      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Failed to delete blogs' });
      }
    });


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('O+orO- is setting')
})

app.listen(port, () => {
  console.log(`O+orO- is running on port ${port}`)
})
