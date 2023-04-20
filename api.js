const express = require("express");
const app = express();
const bodyParser =  require("body-parser")
const mongoose = require ("mongoose");
const swaggerUi = require('swagger-ui-express'),
 swaggerDocument = require('./swagger.json');
 const MongoClient = require("mongodb").MongoClient;
 const uri="mongodb+srv://malavika:iplon321@iploncluster.rrnysbd.mongodb.net/?retryWrites=true&w=majority"
 const client = new MongoClient(uri);
//  mongo connection
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
async function connect()
{
    try{     
        await mongoose.connect(uri)
        console.log("connected to mongoDB");
    }catch(error){
        console.error(error);
    }

    }
    connect();
    
app.get("/Employees", async (req, res) => {
  const db = client.db("iplondb");
  let collection = await db.collection("iplon_test");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});
app.get("/Employee/:id", async (req, res) => {

  const db = client.db("iplondb");
  let collection = await db.collection("iplon_test");
  let results = await collection.find({id:parseInt(req.params.id)}).toArray()
    console.log(results)
        res.send(results).status(200);
        
  });
 
  app.post("/addEmployee", (req, res) => {
    const db = client.db("iplondb");
    let collection =  db.collection("iplon_test");
    const employee = [
  
      { id:parseInt(req.body._id), 
        name:req.body.name, 
        Team:req.body.Team,
        status:req.body.status}
    ];

    // this option prevents additional documents from being inserted if one fails

    const options = { ordered: true };
    const result =  collection.insertMany(employee, options);
    res.send(employee)
    console.log(employee)
  });

app.put("/Employee/:EmployeeId", async(req, res) => {
  const db = client.db("iplondb");
  let collection =  db.collection("iplon_test");
    const id = parseInt(req.params.EmployeeId, 10);  
; 
    if (!id) {
      return res.status(404).send({
        success: 'false',
        message: 'Employee not found',
      });
    }
  const filter = {id:id};
    const updateDoc = {
        $set: {
        id: parseInt(req.params.EmployeeId, 10),
        name:req.body.name ,
        Team: req.body.Team ,
        status: req.body.status,
    }
    };
    const result = await collection.updateMany(filter, updateDoc);
    console.log(result)
    res.send(updateDoc)
  })
  app.delete("/Employee/:EmployeeId", async(req, res) => {
    const database = client.db("iplondb");
  
    const collection = database.collection("iplon_test");
const deleteResult = await collection.deleteMany({id:parseInt(req.params.EmployeeId, 10)})
res.send("deleted one document" )
})
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8000,() =>{
    console.log("server started on port 8000");
});
