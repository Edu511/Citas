import React, { Component } from 'react'
import './Footer.css'
import logoH from '../../img/logoH.png'
import escudo from '../../img/escudo.svg'

export default class Footer extends Component {
  render () {
    return (
      <div className="container-fluid py-5 px-3" style={{background: "#092432"}}>
        <div className="row align-items-center">
          <div className="col-md-4 my-3 d-flex justify-content-center">
            <img className='img-fluid' src={logoH} style={{width: "150px"}} alt='' />
          </div>
          <div className="col-md-4 my-3">
            <div className="d-flex justify-content-center" style={{color: "#f4f4f4"}}>
              <img className='img-fluid' src={escudo} style={{width: "150px"}} alt='' />
            </div>
            <div className="d-flex justify-content-center" style={{color: "#f4f4f4"}}>
              <p className="text-center">© 2019 Gobierno del Estado de Hidalgo</p>
            </div>
          </div>
          <div className="col-md-4 my-3 d-flex justify-content-center" style={{color: "#f4f4f4"}}>
            <p>
              Contacto
              <br/>
              Carretera México – Pachuca Km 84.5, Centro Cívico
              <br/>
              Pachuca de Soto, Hidalgo, México
              <br/>
              +52 (771) 71 79000 Ext. 9217
            </p>
          </div>
        </div>
      </div>
    )
  }
}
