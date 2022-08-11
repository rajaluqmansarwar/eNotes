import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  // For Redirecting after successfull registeration
    const navigate=useNavigate();

  // Storing Entered Data in a state
  const [signupData, setSignupData] = useState({name:"",email:"",password:"",cpassword:""})

  // Handling Entered Data
    const changeHandler=(e)=>{
      setSignupData({...signupData, [e.target.name]: e.target.value});
    }

  // Handling Submission of data
    const signupHandler=async (e)=>{

      e.preventDefault();
      // checking if password and confirm password matches
      if(signupData.password===signupData.cpassword){
        // Destructuring value variables from signupData state array
        const {name,email,password}= signupData;
        try {
            // Calling createuser api
              const response= await fetch('http://localhost:5000/api/auth/createuser',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({name,email,password})
              }) 

              const json= await response.json();
              console.log(json.success,json);
                if(json.success){
                    localStorage.setItem("token",json.authToken);
                    navigate('/Login');
                }
                else{
                    alert("error");
                }
          
        } catch (error) {
            console.log(error);
        }
      }
      else{
        alert("Passwords do not match");
      }
    }

  return (
      <>
        <div className="container mt-5">
                      <h2>Register to start using eNotes</h2>
                      <form onSubmit={signupHandler}>
                          <div className="my-3">
                              <label htmlFor="name" className="form-label">Name</label>
                              <input type="text"  className="form-control" id="name" name='name'  minLength={3}  required value={signupData.name} onChange={changeHandler}/>
                          </div>
                          <div className="my-3">
                              <label htmlFor="email" className="form-label">Email address</label>
                              <input type="text"  className="form-control" id="email" name='email'  required value={signupData.email} onChange={changeHandler}/>
                          </div>
                          <div className="my-3">
                              <label htmlFor="password" className="form-label">Password</label>
                              <input type="password" className="form-control" required value={signupData.password} minLength={5} onChange={changeHandler} name="password" id="password" />
                          </div>
                          <div className="my-3">
                              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                              <input type="password" className="form-control" required value={signupData.cpassword} minLength={5} onChange={changeHandler} name="cpassword" id="cpassword" />
                          </div>
                          <button type="submit" className="btn btn-primary">Signup</button>
                      </form>
        </div>
      </>
  )
}

export default Signup