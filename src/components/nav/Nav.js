import React from 'react'
import './Nav.css'
import logonav from '../../img/logonav.svg'

const Nav = props => (
  <div>
    <div className='navbar'>
      <div className='navbar-navigation'>
        <div>
          <img className='logo' src={logonav} alt='' />
        </div>
      </div>
    </div>
  </div>
)

export default Nav
