import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    // For redirecting after successfull login
        let navigate=useNavigate();
    
    // Storing Credentials
    const [credentials, setCredentials] = useState({email:"",password:""});

    // For handling entered values
        const changeHandler=(e)=>{
            setCredentials({...credentials,[e.target.name]:e.target.value});
        }
    // for handling Login
        const loginHandler= async (e)=>{
            e.preventDefault();
            console.log(credentials.password + " haha");
            try {
                const response= await fetch(`http://localhost:5000/api/auth/login`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({email:credentials.email,passowrd:credentials.password})
                })
                const json= await response.json();
                console.log(json.success,json);
                if(json.success){
                    localStorage.setItem("token",json.authToken);
                    navigate.push('/');
                }
                else{
                    alert("Invalid passsss");
                }
            } catch (error) {
                console.log(error);
            }

        }
    
  return (
    <>
        {/* Login Form */}
          <form onSubmit={loginHandler}>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="text"  className="form-control" id="email" name='email' required value={credentials.email} onChange={changeHandler}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name='password' required value={credentials.password} onChange={changeHandler}/>
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
          </form>
    </>
  )
}

export default Login;