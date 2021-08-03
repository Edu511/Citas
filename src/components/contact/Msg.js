import React, { Component } from 'react'
import './Contact.css'
import logoHgo from '../../img/logo_hgo.png'
import { Link } from 'react-router-dom'

export default class Contact extends Component {
  render () {
    return (
      <div className='mensaje'>
        <div className='col-msg'>
          <div className='msg-center'>
            <img className='logo_m' src={logoHgo} alt='' />
            <p className='p-sz'>
              En unas horas recibiras un correo confirmando la fecha y hora de tu cita.
            </p>
            <Link to='/Contact'>
              <button className='button-f'>Regresar</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
