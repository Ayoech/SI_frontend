import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginresponseData, setLoginresponseData] = useState('');
  const navigate = useNavigate();

  const inputStyle = {
    width: '300px',
    padding: '8px',
    border: '1px solid #ccc',
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Prepare data to be sent to the backend
      const response = await fetch('http://localhost:3000/api/v1/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      // Parse the response from the backend
      const result = await response.json();

      // Handle case if login fails
      if (response.status !== 200) {
        setLoginresponseData(result.message);
      } else {
        // If successful, store JWT in local storage
        const { token, role, email, userId } = result;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ role, email, userId }));

        // Navigate based on user role
        if (role === 'A_ECOLE') {
          navigate('/ecole');
        } else if (role === 'A_ENTREPRISE') {
          navigate('/entreprise');
        } else if (role === 'ETUDIANT') {
          navigate('/dash');
        } else if (role === 'G_ENTREPRISE') {
          navigate('/entreprise');
        } else {
          console.error('Unknown role:', role);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id='log'>
      <div className='login-container'>
        <div className='form-wrapper'>
          <h2>Login</h2>
          <form action='#' method='post'>
            <div className='input-box'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                id='email'
                name='email'
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
                placeholder='Enter your email'
                required
              />
            </div>
            <div className='input-box'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                value={loginData.password}
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
                name='password'
                placeholder='Enter your password'
                required
              />
            </div>
            <button type='submit' className='login-btn' onClick={handleLogin}>
              Login
            </button>
          </form>
          <div className='links'>
            <a href='#'>Forgot Password?</a>
          </div>
          {loginresponseData && (
            <div className='error-message'>
              <p>{loginresponseData}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
