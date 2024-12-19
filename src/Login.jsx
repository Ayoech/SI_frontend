import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <body id='log'>
    <div class="login-container">
    <div class="form-wrapper">
      <h2>Login</h2>
      <form action="#" method="post">
        <div class="input-box">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" required />
        </div>
        <div class="input-box">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="login-btn">Login</button>
      </form>
      <div class="links">
        <a href="#">Forgot Password?</a>
        
      </div>
    </div>
  </div>
  </body>
    
  
  );
}

export default Login;
