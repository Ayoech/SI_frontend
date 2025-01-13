import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginService } from './Services/LoginService';
import Spinner from './components/Spinner';
import CheckIfEtudiantHasTags from './Services/CheckIfEtudiantHasTags';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginresponseData, setLoginresponseData] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await LoginService(loginData);
      console.log(response);
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (response.data.message === "invalid username or password") {
        setLoginresponseData(response.data.message);
      } else {
        const role = user.role;
        if (role === 'A_ECOLE') {
          navigate('/ecole/etudiants');
        } else if (role === 'A_ENTREPRISE') {
          navigate('/entreprise');
        } else if (role === 'ETUDIANT') {
          const result = await CheckIfEtudiantHasTags();
          const reponse = result.data;
          if (reponse === false) {
            navigate('/etudiant/tags');
          } else {
            navigate('/student/Profile');
          }
        } else if (role === 'G_ENTREPRISE') {
          navigate('/entreprise');
        } else {
          console.error('Unknown role:', role);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="log"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc', // Light gray background
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        className="login-container"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          backgroundColor: '#ffffff', // White card background
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        {/* School Logo */}
        <img
          src="/logo.png"
          alt="School Logo"
          style={{ width: '100px', marginBottom: '20px' }}
        />

        {/* Login Form */}
        <h2 style={{ marginBottom: '20px', color: '#1f2937', fontSize: '1.4rem', fontWeight: 'bold'}}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-box" style={{ marginBottom: '15px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: '#4b5563',
                fontWeight: 'bold',
              }}
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            />
          </div>
          <div className="input-box" style={{ marginBottom: '20px' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: '#4b5563',
                fontWeight: 'bold',
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              name="password"
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            />
          </div>
          <button
            type="submit"
            className="login-btn"
            style={{
              width: '30%',
              padding: '10px',
              backgroundColor: 'tomato', // Blue button
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textAlign: 'center',
              marginLeft: '130px',
              paddingLeft: '33px'

            }}
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
        <div className="links" style={{ marginTop: '15px' }}>
          <a
            href="#"
            style={{
              color: '#2563eb',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            Forgot Password?
          </a>
        </div>
        {loginresponseData && (
          <div
            className="error-message"
            style={{
              marginTop: '15px',
              color: '#dc2626', // Red error color
              fontSize: '14px',
            }}
          >
            {loginresponseData}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
