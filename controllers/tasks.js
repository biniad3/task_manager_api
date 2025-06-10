const pool=require("../db/connect")

const getAllTasks=async(req,res)=>{
    try {
        const result=await pool.query("SELECT * FROM task")
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(404).send("There is no task in the database")
    }   
}
const createTask = async (req, res) => {
    const { name, completed } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO task (name, completed) VALUES ($1, $2) RETURNING *",
        [name, completed || false]
      );
      res.status(201).json({ task: result.rows[0] });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
const getTask = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ msg: `No task found with Id: ${id}` });
      }
      res.status(200).json({ task: result.rows[0] });
    } catch (error) {
      res.status(404).send("Task not found");
    }
  };
  
  
  const updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;
    try {
      const result = await pool.query(
        "UPDATE task SET name = $1, completed = $2 WHERE id=$3 RETURNING *",
        [name, completed, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ msg: `No task found with Id: ${id}` });
      }
      res.status(200).json({ task: result.rows[0] });
    } catch (error) {
      res.status(500).send("Update failed");
    }
  };
  
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM tasks] WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: `No task found with Id: ${id}` });
    }
    res.status(200).json({ msg: "Task deleted", task: result.rows[0] });
  } catch (error) {
    res.status(500).send("Delete failed");
  }
}

module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}