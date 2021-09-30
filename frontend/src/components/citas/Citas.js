import React, { Component } from 'react'
import './Citas.css'
import firebase from '../../firebase/firebaseConfig'
import { Link } from 'react-router-dom'

export default class Citas extends Component {
  constructor () {
    super()
    this.ref = firebase.firestore().collection('citas')
    this.unsubscribe = null
    this.state = {
      citas: []
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const citas = []
    querySnapshot.forEach((doc) => {
      const { nombre, apellidop, apellidom, email, sexo, cel, tel, sede, cita, fecha, hora } = doc.data()
      citas.push({
        key: doc.id,
        doc,
        nombre,
        apellidop,
        apellidom,
        email,
        sexo,
        cel,
        tel,
        sede,
        cita,
        fecha,
        hora
      })
    })
    this.setState({
      citas
   })
  }

  componentDidMount () {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  render () {
    return (
      <div className='cent-compro'>
        <div className='App'>
          <h2 className='title'>Citas</h2>
          <div className='row-cit'>
            <Link to='/Contact' className='nolink'>
              <p className='p-f-s'><b>Agendar Cita</b></p>
            </Link>
          </div>
          <div className='table-cont'>
            <div className='products-al'>
              <div className='a-row-t'>Nombre</div>
              <div className='a-row-t'>Telefono Celular</div>
              <div className='a-row-t'>Fecha</div>
              <div className='a-row-t'>Tipo de Cita</div>
              <div className='a-row-t'></div>
            </div>
            <div>
              {this.state.citas.map(citas =>
                <div>
                  {/*{citas.realizo === admin &&*/}
                  <div className='products-al2'>
                    <div className='a-row'>{citas.nombre} {citas.apellidop} {citas.apellidom}</div>
                    <div className='a-row'>{citas.cel}</div>
                    <div className='a-row'>{citas.fecha} / {citas.hora}</div>
                    <div className='a-row'>{citas.cita}</div>
                    <div className='a-row vista'>
                      <Link to={`/edit/${citas.key}`}>Ver</Link>
                    </div>
                  </div>
                {/*}*/}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
