import React, { Component } from 'react'
import firebase from '../../firebase/firebaseConfig'
import './Citas.css'

export default class Comprometido extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: '',
      nombre: '',
      apellidop: '',
      apellidom: '',
      email: '',
      sexo: '',
      cel: '',
      tel: '',
      sede: '',
      cita: '',
      fecha: '',
      hora: ''
    }
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('emails').doc(this.props.match.params.id)
    ref.get().then((doc) => {
      if (doc.exists) {
        const citas = doc.data()
        this.setState({
          key: doc.id,
          nombre: citas.nombre,
          apellidop: citas.apellidop,
          apellidom: citas.apellidom,
          email: citas.email,
          sexo: citas.sexo,
          cel: citas.cel,
          tel: citas.tel,
          sede: citas.sede,
          cita: citas.cita,
          fecha: citas.fecha,
          hora: citas.hora
        })
      } else {
        console.log('No se encuentra documento')
      }
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState({citas:state})
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { nombre, apellidop, apellidom, email, sexo, cel, tel, sede, cita, fecha, hora } = this.state
    const ref = firebase.firestore().collection('emails').doc(this.state.key)
    ref.set({
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
    }).then((docRef) => {
      this.setState({
        nombre: '',
        apellidop: '',
        apellidom: '',
        email: '',
        sexo: '',
        cel: '',
        tel: '',
        sede: '',
        cita: '',
        fecha: '',
        hora: ''
      })
      this.props.history.push('/')
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
  }

  render() {
    return (
      <div className='container-e'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <div className='btn'>Agregar hora de cita</div>
            <form onSubmit={this.onSubmit} style= {{marginLeft: '15px', marginTop: '30px'}}>
              <div className='form-group'>
                <label for='nombre' className='ca'>Nombre:</label>
                <input type='text' className='form-control' name='nombre' value={this.state.nombre} onChange={this.onChange} placeholder='Nombre' disabled/>
              </div>
              <div className='form-group'>
                <label for='email' className='ca'>Email:</label>
                <input type='text' className='form-control' name='email' value={this.state.email} onChange={this.onChange} placeholder='Email' disabled/>
              </div>
              <div className='form-group'>
                <label for='cel' className='ca'>Telefono:</label>
                <input type='text' className='form-control' name='cel' value={this.state.cel} onChange={this.onChange} placeholder='Telefono' disabled/>
              </div>
              <div className='form-group'>
                <label for='fecha' className='ca'>Fecha:</label>
                <input type='date' className='form-control' name='fecha' value={this.state.fecha} onChange={this.onChange} placeholder='Fecha' />
              </div>
              <div className='form-group'>
                <label for='hora' className='ca'>Hora:</label>
                <select className='form-control' name='hora' value={this.state.hora} onChange={this.onChange} placeholder='Hora'>
                  <option name='hora'></option>
                  <option name='hora'>1:00 am</option>
                  <option name='hora'>2:00 am</option>
                  <option name='hora'>3:00 am</option>
                  <option name='hora'>4:00 am</option>
                  <option name='hora'>5:00 am</option>
                  <option name='hora'>6:00 am</option>
                  <option name='hora'>7:00 am</option>
                  <option name='hora'>8:00 am</option>
                  <option name='hora'>9:00 am</option>
                  <option name='hora'>10:00 am</option>
                  <option name='hora'>11:00 am</option>
                  <option name='hora'>12:00 pm</option>
                  <option name='hora'>13:00 pm</option>
                  <option name='hora'>14:00 pm</option>
                  <option name='hora'>15:00 pm</option>
                  <option name='hora'>16:00 pm</option>
                  <option name='hora'>17:00 pm</option>
                  <option name='hora'>18:00 pm</option>
                  <option name='hora'>19:00 pm</option>
                  <option name='hora'>20:00 pm</option>
                  <option name='hora'>21:00 pm</option>
                  <option name='hora'>22:00 pm</option>
                  <option name='hora'>23:00 pm</option>
                  <option name='hora'>24:00 pm</option>
                </select>
              </div>
              <button type='submit' className='btn btn-success'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
