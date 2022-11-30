const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const taskModel = require('./src/models/tasksModel');

const PORT  = process.env.PORT || 5000;

app.use(express.urlencoded());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.set('view engine','ejs');

//app.get('/', (req,res) => res.send("Hellp world!"))




app.post('/v1/tasks', async (req,res)=>{

  try{
    var insertedDocs = [];
     //   const task = await taskModel.create(req.body)
     const task = await taskModel.insertMany(req.body,function (err, mongooseDocuments){
        insertedDocs.push(mongooseDocuments.find()._id)
       
     });
console.log(insertedDocs);
     res.status(201).json({
        ids: JSON.stringify(insertedDocs)
        })
     
    
    
    }
    catch(err){
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
})


app.get('/v1/tasks', async (req,res)=>{

    try{
          const tasks = await taskModel.find()
          res.status(200).json({
              tasks: tasks
          })
      }
      catch(err){
          res.status(500).json({
              status: "Failed",
              message: err.message
          })
      }
  })


  app.post('/v1/tasks/:id', async (req,res)=>{

    try{
        console.log(req.params.id);
          const tasks = await taskModel.findOne({_id: req.params.id})
          res.status(200).json({
              tasks
          })
      }
      catch(err){
          res.status(404).json({
              status: "Failed",
              error: "There is no task at that id"
          })
      }
  })

//id to be deleted is 63877ca7c135348eea898f7b

//to delete  6387815986fd40f0c60c998b 

  app.delete('/v1/tasks/:id', async (req,res)=>{

    try{
        console.log(req.params.id);
          const tasks = await taskModel.findByIdAndDelete({_id: req.params.id})
          res.status(204).json();
      }
      catch(err){
          res.status(204).json({
          })
      }
  })

  //delete bulk 

  //to delete  63877f4fcc7e1462e3df3dc9" 
  //to delete 63877f4fcc7e1462e3df3dca

  ///Bulk Delete
  app.delete('/v1/tasks/', async (req,res)=>{

    try{
           req.body.tasks.forEach((e) => {
            taskModel.findByIdAndDelete(e.id).then(() =>  res.end("Success")
           
            );
          });
        // console.log(req.body.tasks);
        //     const tasks = await taskModel.deleteMany(req.body.tasks) 
        //     console.log(tasks.deletedCount);
        
      
      }
      catch(err){
          res.status(204).json({
           // err:err.message
          })
      }
  })

/// modigt id 63877ca1c135348eea898f79
app.put('/v1/tasks/:id', async (req,res)=>{

    try{
        console.log(req.params.id);
          const tasks = await taskModel.findByIdAndUpdate({_id: req.params.id}, req.body)
          res.status(204).json();
      }
      catch(err){
          res.status(404).json({
            status: "Failed",
            error: "There is no task at that id"
          })
      }
  })





app.listen(PORT, ()=> 
console.log(`server started at http://localhost:${PORT}`)
);












