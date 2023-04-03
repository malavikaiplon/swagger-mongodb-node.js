const express = require("express");
const mongoose = require ("mongoose");
const MongoClient = require("mongodb").MongoClient;
const uri="mongodb+srv://malavika:iplon321@iploncluster.rrnysbd.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);

//  mongo connection

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
    

 /*  MongoClient.connect(uri).then((client) => {
  
        console.log('Database created');
          
        // database name
        const db = client.db("testdb");
          
        // collection name
        db.createCollection("test");
    })
*/

async function run() {

    try {
  
      const database = client.db("iplondb");
  
      const collection = database.collection("iplon_test");
  
      // create an array of documents to insert
  
      const docs = [
  
        { id:1, name: "malavika", status: "Remote"},
  
        {id:2,  name: "vani", status: "Available" },
  
        {id:3, name: "naveen", status: "Available" }
  
      ];
  
      // this option prevents additional documents from being inserted if one fails
  
      const options = { ordered: true };
  
      const result = await collection.insertMany(docs, options);
  
      console.log(`${result.insertedCount} documents were inserted`);
  
    } finally {
  
      await client.close();
  
    }
  
  }
  
  run().catch(console.dir);
 


