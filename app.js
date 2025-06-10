const express=require('express')
const app=express()
const tasks=require('./routes/tasks')
const pool=require("./db/connect")
require("dotenv").config()

//middleware
app.use(express.json())// allows us to extract data from body

//routes
app.get('/',(req,res)=>{
    res.send("This is test from task manager using express")
})

app.use('/api/v1/tasks',tasks)

const port=3000
const start = async () => {
    try {
      const client = await pool.connect(); // connect to PostgreSQL
      console.log('Connected to PostgreSQL database');
      client.release(); // release the connection back to the pool
  
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    } catch (error) { 
      console.error('Failed to connect to PostgreSQL:', error);
    }
  };

start()

