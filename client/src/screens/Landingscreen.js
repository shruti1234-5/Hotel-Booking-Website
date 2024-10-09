import React from 'react'
import { Link } from 'react-router-dom'
 function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>
          <div className='col-md-9 my-auto text-center'style={{borderRight : "8px solid white"}}>
                 <h2 className='animated-title' style={{color:'white',fontSize:'130px'}}>RapidRooms</h2>
                 <h1 style={{color:'white'}}>There is only one Boss. The Guest.</h1>
                 <Link to='/home'>
                 <button className='btn landing-btn'style={{color:'black'}}>Get Started</button>
                 </Link>
      </div>
    </div>
  )
}
export default Landingscreen;