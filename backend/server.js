
import express from 'express';
import db from './database.js';//sqlite3
import fdb from './firebase.js';//firebase

const app = express();

app.use(express.json()); // declare will use json type body (req)

// Test for running
app.get('/', (req, res) => {
    res.send('Api running......')
})

//@description Get all users
//@route       GET /api/users
//@access      Public
app.get('/api/users', (req,res) => {

    const sql = "select * from users";
    const params = []
    db.all(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.json({data:row})
      });
})

//@description Auth user
//@route       POST /api/login
//@access      Public
app.post('/api/login', (req, res) => {
    
    const {username, password} = req.body;
    const sql = "select * from users where username = ? and password = ?";
    const params = [username, password]
    db.get(sql, params, (err, row) => {
        
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        } 
        
        if (row == undefined) {
            res.json({status:"failure"})
        } else {
            res.json({status:"success"})
        }

      });

})

//@description Register user
//@route       POST /api/signup
//@access      Public
app.post('/api/signup', (req, res) => {
    
    const {username, password} = req.body;
    const sql = "insert into users (username, password) values(?,?)";
    const params = [username, password]
    db.run(sql, params, err => {
        
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        } 
        
          res.status(200).json({status:"success"})
        
      });

})
//@description get leaders
//@route       get /api/leaders
//@access      Public
app.get('/api/leaders', async (req, res) => {

     const leaderRef = fdb.collection('leaderboard').doc('leaderboard')
     const doc = await leaderRef.get();
     if(!doc.exists) {
      res.status(404)
      throw new Error('leaderboard not found')
     }
     res.status(200).json(doc.data())
  }
);

//@description update leaders
//@route       put /api/update
//@access      Public
app.put('/api/update', async (req, res) => {
  const {username, result} = req.body;
  const leaderRef = fdb.collection('leaderboard').doc('leaderboard')
  let doc = await leaderRef.get();
  if(!doc.exists) {
    res.status(404)
    throw new Error('leaderboard not found')
   }
  const {leaders} = doc.data()

  if(result == 'correct') {

    if(leaders.length == 10) leaders.pop();
    
    leaders.unshift(username);
    const doc2 = await leaderRef.set({
      leaders : leaders
    }, {merge:true});

    doc = await leaderRef.get();

    res.status(200).json(doc.data())

  } else {

     res.status(200).json(doc.data())
  }
  
 }
);

// Default response for any other request
app.use((req, res) => {
    res.status(404).json({"error": "Invalid request"});
});

const PORT = 3000

app.listen(PORT, console.log(`Server running in port ${PORT}`))
