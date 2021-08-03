import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../../actions'
import './Login.css'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value })
  }

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value })
  }

  handleSubmit = () => {
    const { dispatch } = this.props
    const { email, password } = this.state
    dispatch(loginUser(email, password))
  }

  render () {
    const { loginError, isAuthenticated } = this.props
    if (isAuthenticated) {
      return <Redirect to='/' />
    } else {
      return (
        <div className='login-container'>
          <div className='back-login'>
            <div className='login-ins'>
              <div className='login-col'>
                <div className='login'>
                  <h2 className='login-color'>Bienvenido!</h2>
                  <div className='border-form-login'>
                    <div className='input-cen-log'>
                      <input
                        placeholder='Correo'
                        id='email'
                        onChange={this.handleEmailChange}
                        className='correo'
                      />
                    </div>
                    <div className='input-cen-log'>
                      <input
                        placeholder='Contraseña'
                        id='password'
                        type='password'
                        onChange={this.handlePasswordChange}
                        className='contraseña'
                      />
                    </div>
                    {loginError && (
                      <p className='error-log'>
                        Correo o contraseña icorrectos
                      </p>
                    )}
                    <div className='cta2'>
                      <button
                        className='boton-lo'
                        onClick={this.handleSubmit}
                      >
                        ENTRAR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default (connect(mapStateToProps)(Login))
