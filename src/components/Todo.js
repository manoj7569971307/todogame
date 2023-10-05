import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
      const fetchData=async ()=>{
        const response=await axios.get("https://my-first-project-7e52e-default-rtdb.firebaseio.com/register.json")
        const data=Object.entries(response.data).map(([id,task])=>({id,...task}) )
        console.log(data)
        setTasks(data)
        
      }

      fetchData() 

      const refresh=setInterval(()=>{
        fetchData()
      },1000)

      return ()=>{
        clearInterval(refresh)
      }

  }, []);


const addTask=async ()=>{
  if(newTask!==''){
    const dataFull={
      text:newTask,
    }
    await axios.post("https://my-first-project-7e52e-default-rtdb.firebaseio.com/register.json",dataFull).then(
      ()=>alert("submitted"))
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

export default TodoApp;