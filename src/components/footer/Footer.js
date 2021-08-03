import React, { Component } from 'react'
import './Footer.css'
import logoH from '../../img/logoH.png'
import escudo from '../../img/escudo.svg'

export default class Footer extends Component {
  render () {
    return (
      <div className='footer-container'>
        <div className='legal'>
          <div className='img-f'>
            <img className='imgH' src={logoH} alt='' />
          </div>
          <div className='legal div-c'>
            <div className='div-col'>
              <div className='div-rw'>
                <img className='imgH2' src={escudo} alt='' />
              </div>
              <p className='cc'>
                © 2019 Gobierno del Estado de Hidalgo
              </p>
            </div>
          </div>
          <div className='img-f'>
            <p className='div-i'>
              Contacto <br />
              Carretera México – Pachuca Km 84.5, Centro Cívico
              <br />
              Pachuca de Soto, Hidalgo, México
              <br />
              +52 (771) 71 79000 Ext. 9217
            </p>
          </div>
        </div>
      </div>
    )
  }
}
