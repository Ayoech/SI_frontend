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
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const inputStyle = {
    width: '300px',
    padding: '8px',
    border: '1px solid #ccc',
  };

  
  const handleLogin = async(e)=>{
    e.preventDefault(); 
    try{
      setLoading(true)
      const response = await LoginService(loginData);
      console.log(response);
      const user = JSON.parse(localStorage.getItem('user')); 
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
                const result = await CheckIfEtudiantHasTags();
                const reponse = result.data;
                console.log('res: ',result)
                if(reponse==false){
                  navigate('/etudiant/tags')
                }else{
                  navigate('/student/Profile');
                }
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
      }finally{
        setLoading(false)
      }
    }

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
            <button type='submit' className='login-btn mb-2' style={{
        position: 'relative',
        
       
        justifyContent: 'center',
        
        
      }} onClick={handleLogin} disabled={loading}>
              {loading?<Spinner/>:'Login'}
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
