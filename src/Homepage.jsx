import { useState } from 'react'
import reactLogo from './assets/react.svg'
import logo from '/logo.png';
import { Link } from'react-router-dom'
import slider from '/slider-img.png'
import { CiMenuFries } from "react-icons/ci";
import ima from '/ez.jpg'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <div className= 'my-container'>
        <div className='my-header flex' >
          <img src={logo} className="logo" alt="" style={{marginRight: "2px", marginTop:"10px",height:'60px',width:'60px'}}/>
          <b style={{color: "white", fontFamily: "Arial, Helvetica, sans-serif", marginTop: "20px", fontSize: "1.8rem"}}>ENSIAS</b>
          <div className='big'>You Can <br></br> Post Internship Opportunities Here</div>
          <div className='small'>Unlock a pool of talented, motivated interns  ready to contribute to your company’s success <br />  <br />  <Link to="/signin"><button style={{backgroundColor: 'Tomato', color: 'white', fontSize: '1.3rem', padding: '1.1rem'}}>Sign in</button></Link> </div>
      
        </div>
        
        <div className='right' ><b> <div className="icon-container"><CiMenuFries size= {40} color="white" /></div>
        <img src={slider} width= "500px" style={{marginTop: '80px', marginLeft: "80px"}} alt="" /></b>
        
        </div>
      </div>
      <div className='desc'>
        <img src={ima} alt="" height="600px" width="600px" style={{marginRight: '40px', marginTop: '80px'}} />
        <div style={{marginTop: '150px', marginLeft: '260px', fontSize: '1.6rem'}}>
          <b style={{marginLeft: '100px'}}>DISCOVER HIGHLY SKILLED INTERNS  </b> <br /><br />
          It’s a well-established fact that the right internship experience can shape the future of a talented individual. At our platform, you’ll find motivated students with a diverse range of skills, ready to contribute and grow within your organization. The goal is simple: connect businesses with the next generation of professionals who are eager to make a meaningful impact.
        </div>

      </div>
      
      
    </>
  )
}

export default Home;
