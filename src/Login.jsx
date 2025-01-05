import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginService } from './Services/LoginService';



function Login() {
  const [loginData, setLoginData] = useState({
    "email": "",
    "password": ""
  });
  const [loginresponseData, setLoginresponseData] = useState("");
  const navigate = useNavigate();
  
  const inputStyle = {
    width: '300px', // Set the width of the input field
    padding: '8px', // Example of adding some padding
    border: '1px solid #ccc',
    //marginLeft: '90px', // Example border
  };

  /*async function handleLogin() {
    let item = { email, password };
    
    let result = await fetch("http://localhost:8000/api/login", {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    });

    result = await result.json();
    if (result.message) {
      // Store the email and other user information in local storage
      localStorage.setItem("user-info", JSON.stringify({
        email: result.email, // Store email from response
        // Store name or any other relevant info
      }));
      navigate(`/add/${email}`); // Redirect to /add after successful login
    } else {
      alert(result.error); // Show error message
    }
  }*/

    const handleLogin = async(e)=>{
      e.preventDefault(); 
      try{
        const response = await LoginService(loginData);
        console.log(response);
        const user = JSON.parse(localStorage.getItem('user')); // Retrieve decoded user data
        const token = localStorage.getItem('token');
            if (response.data.message === "invalid username or password") {
                setLoginresponseData(response.data.message);
                
            } else {
                console.log('Welcome');
                const role = user.role; 
                if (role === 'A_ECOLE') {
                    navigate('/ecole/etudiants');
                } else if (role === 'A_ENTREPRISE') {
                    navigate('/entreprise');
                } else if(role === 'ETUDIANT'){
                    navigate('/student/Profile');
                }
                else if(role === 'G_ENTREPRISE'){
                  navigate('/entreprise');
              }
                else {
                    console.error('Unknown role:', role);
                }
            }
        } catch (error) {
              console.log(error);
    }
  }

  return (
    <div id='log'>
    <div className="login-container">
    <div className="form-wrapper">
      <h2>Login</h2>
      <form action="#" method="post">
        <div className="input-box">
          <label for="username">Email</label>
          <input type="text" id="email" name="email" value={loginData.email} onChange={(e) => {setLoginData({ ...loginData, email: e.target.value }) }} placeholder="Enter your email" required />
        </div>
        <div class="input-box">
          <label for="password">Password</label>
          <input type="password" id="password" value={loginData.password} onChange={(e) => {setLoginData({ ...loginData, password: e.target.value }) }} name="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="login-btn" onClick={handleLogin}>Login</button>
      </form>
      <div class="links">
        <a href="#">Forgot Password?</a>
        
      </div>
    </div>
  </div>
  </div>
    
  
  );
}

export default Login;
