import React, { useState, useEffect } from 'react';
import './Todo.css'
import axios from 'axios';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    
      const fetchData=async ()=>{
        try{
          const response=await axios.get("https://my-first-project-7e52e-default-rtdb.firebaseio.com/register.json")
        const data=Object.entries(response.data).map(([id,task])=>({id,...task}) )
        console.log(data)
      
        setTasks(data)

        }
        catch(error){
          
          console.log("error",error)
        }
         
        
      }

      fetchData() 

      const refresh=setInterval(()=>{
         

        fetchData()
        

      },5000)

      return ()=>{
        clearInterval(refresh)
      }

  }, []);


const addTask=async ()=>{
  if(newTask!==''){
    const dataFull={
      text:newTask,
    }
    await axios.post("https://my-first-project-7e52e-default-rtdb.firebaseio.com/register.json",dataFull)
      
      setNewTask('')

  }
   
}

const deleteButton=async (id)=>{
  await axios.delete(`https://my-first-project-7e52e-default-rtdb.firebaseio.com/register/${id}.json`)
  console.log(id)
}
  return (
    <div className="TodoApp">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Add a task"
          value={newTask}
        
          onChange={(e) => setNewTask(e.target.value)}
        />
         
        <button onClick={addTask} >Add</button>
        <ul>
          {tasks.map((each)=><li>{each.text}<button onClick={()=> deleteButton(each.id) }>Delete </button></li>)}
        </ul>
      </div>
       
    </div>
  );
}

export default Todo;