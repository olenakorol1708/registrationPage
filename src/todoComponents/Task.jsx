
import React from "react";


export const Task = ({ item, tasks, setTasks}) => {
 
  const [text,setText] = React.useState(item.title);
  const [isEdit, setIsEdit] = React.useState(false);
  

  async function deleteFetch(ID){
    try{
let response = await fetch(`https://first-node-js-app-r.herokuapp.com/api/todos/${ID}`,{
  method:"DELETE",
  headers:{
    "Content-type":"application/json",
    Authorization:"Bearer " +localStorage.getItem("token")
  }
})
let result = await response.json();
return result.ID
    }
    catch(error){
      console.log(error.message);
  }}



const handleDelete =async(ID)=>{
  const id = await deleteFetch(ID)
    const filteredArr = tasks.filter((item)=> item.ID !== id);
    setTasks([...filteredArr])
   
    console.log(filteredArr)
  
  }

  async function editFetch(ID){
    try{
      let response = await fetch(`https://first-node-js-app-r.herokuapp.com/api/todos/${ID}`,{
        method:"PATCH",
        headers:{
          "Content-type": "Application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body:JSON.stringify({title:text})
      })
      let result = await response.json();
      return result;

    }
    catch(error){
      console.log(error.message)
    }
  }
  const toggle = ()=>{
    if(isEdit){
      handleEdit(item.ID,text)
      setIsEdit(!isEdit)
    }else{
      setIsEdit(!isEdit)
    }
  }
  const handleEdit=async(ID,text)=>{
    console.log("handleEdit",ID,text)
  const arr =  tasks.map(item=>item.ID===ID?({...item,title:text}):(item));
   await editFetch(ID)
   setTasks([...arr])
  
  }
  return (
    <div className='item-block' key = {item.ID}>
    <div className='flex-item' >
     {isEdit ?
     (<input className='choosen-item' onChange = {(e)=>setText(e.target.value)} value = {text}/>):
     (  <p className='item'>{item.title}</p>)}   
     </div><div className='flex-button'>
    <button onClick = {()=>handleDelete(item.ID)}>Delete</button>
    <button onClick = {toggle}>{isEdit? ('Save'):('Edit')}</button></div> 
    </div>
  );
};
