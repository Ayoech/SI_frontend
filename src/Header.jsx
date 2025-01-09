import React, { useEffect, useState } from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs';
 import AvatarWithMenu from './components/Avatar';
 import SignOutService from './Services/SignOutService';
 import logo from '/logo.png';
 import { useNavigate } from 'react-router-dom';

function Header({OpenSidebar}) {

  const [menuOpen,setMenuOpen]=useState(false);
  const [email,setEmail] = useState('')

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const navigate = useNavigate();

  const signOut = async()=> {
    try{
      const response=await SignOutService();
      if(response=="success"){
        navigate('/signin');
      }
    }catch(error){
      console.error('une erreur est survenue lors de la déconnexion');
      throw Error('une erreur est survenue lors de la déconnexion')
    }
  }

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user')); 
    setEmail(user.email)
  },[])


  return (
    <header className='header1'>
      <div className='flex items-center'>
        <div>
          <img src={logo} className="logo" alt="" style={{marginRight: "2px", marginTop:"10px",height:'60px',width:'60px'}}/>
        </div>
        <div className='mt-2'>
          <h1 className='font-bold text-3xl'>ECS ENSIAS</h1>
        </div>
      </div>
      <div className='items-right'>
        <AvatarWithMenu lastName={'Bouraoui'} email={email} toggleMenuOpen={toggleMenu} onSignOut={signOut} menuOpen={menuOpen} />
        </div>
    </header>
  )
}

export default Header;