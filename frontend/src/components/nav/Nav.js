import React from 'react'
import './Nav.css'
import logonav from '../../img/logonav.svg'

const Nav = props => (
  <div className="container-fluid w-100 p-3" style={{background: "#092432"}}>
    <div className="text-center text-md-start">
      <img className='img-fluid' style={{width: "250px"}} src={logonav} alt='' />
    </div>
  </div>
)

export default Nav
