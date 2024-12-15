const express = require('express')
var cors = require('cors')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
}))

app.use(express.json())

let tasks = [
  {
     _id: 0,
     task: "Go to Shop",
  },
  {
     _id: 1,
     task: "Buy Fruits",
  },
  {
     _id: 2,
     task: "Buy Tomato",
  },
  {
     _id: 3,
     task: "Buy Chilly",
  },
  {
     _id: 4,
     task: "Pay",
  },
]

app.get("/", (req, res)=>{
  res.json({tasks: tasks})
})

app.post("/", (req, res)=>{
  console.log(req.body)
  const task = req.body.task
  tasks.push({
    _id: 5,
    task: task,
  })
  res.send("Success")
})


app.delete("/task/:index", (req, res) =>{
  console.log(req.params.index)
  if (req.params.index < tasks.length){
    tasks.splice(req.params.index, 1)
    res.send("Deleted")
  }else{
    res.status(404).json({"message": "Inalid index"})
  }
})

app.put("/task/:index", (req, res) => {
  const index = parseInt(req.params.index)
  const updatedTask = req.body.task

  if (index >= 0 && index < tasks.length) {
    tasks[index].task = updatedTask
    res.send("Task updated successfully")
  } else {
    res.status(404).json({ message: "Invalid index" })
  }
})


app.listen(4000, ()=>{
  console.log("Server Started")
})