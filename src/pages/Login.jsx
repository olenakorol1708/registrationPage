import React from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showPasword, setShowPassword] = React.useState(false);
  

  let navigate = useNavigate();
  const logIn = ()=>{
    setIsLoggedIn(true);
    console.log(isLoggedIn)
  }
  const logOut = ()=>{
    setIsLoggedIn(false)
   
  }
  const handleChangeEmail = (e)=>{
setEmail(e.target.value)
console.log(e.target.value)
  }

  const handleChangePassword = (e)=>{
setPassword(e.target.value)
console.log(e.target.value)
  }

  const toggleShowPassword = ()=>{
setShowPassword(!showPasword)
  }

 async function loginFetch(e){
e.preventDefault();
console.log("login")
try{
let info = {
  password:password,
  email:email
};
const response = await fetch(`${process.env.REACT_APP_MY_KEY}`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
  },
  body:JSON.stringify(info)
})
const result = await response.json();
console.log(result);

if(result.token){
  logIn();
  localStorage.setItem("token", result.token);
 
navigate('/todopage')
}

else{
  logOut();
  navigate('NotFound')
}}
catch(error){
console.log(error.message)
}
  }
  return (
    <div className="page">
     
      <div className="img-container"> <h1 className="title"> LOGIN PAGE</h1></div>
      <div className="presentation">
       
        <form className="form" onSubmit = {loginFetch}>
          <label>
            <input className="input-login" type="email"
             placeholder="Enter your e-mail"
              name="email" 
              onChange = {handleChangeEmail}
              value = {email}/>
          </label>
          <label>
            <input className="input-login"
              type={showPasword ? 'text':'password'}
              placeholder="Enter your password"
              name="password"
              onChange = {handleChangePassword}
              value = {password}/>
            
          </label>
         <label> See my password<input  className = "change-text" type = "checkbox" onClick = {toggleShowPassword}/></label> 
          <button className="button-login" type = "submit">LOGIN</button>
        </form>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};
