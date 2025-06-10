const express=require('express')
const router=express.Router()

const {getAllTasks,createTask,updateTask,deleteTask,getTask}=require("../controllers/tasks")

// router.route('/',(req,res)=>{
//     res.send("Display all tasks")
// })
// router.route('/',(req,res)=>{
//     res.send("Create a new task")
// })
// router.route('/:id',(req,res)=>{
//     res.send("Display a single task")
// })
// router.route('/:id',(req,res)=>{  
//     res.send("Update tasak")
// })
// router.route('/:id',(req,res)=>{
//     res.send("Delete task")
// })
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
module.exports=router
 