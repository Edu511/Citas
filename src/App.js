import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'
import Login from './components/login/Login'
import Citas from './components/citas/Citas'
import Edit from './components/citas/Edit'
import Contact from './components/contact/Contact'
import Msg from './components/contact/Msg'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
//import { useForm } from 'react-hook-form'

const api = axios.create({
  baseURL: 'http://localhot:3000/contact/'
});


function App (props) {
  const { isAuthenticated, isVerifying } = props
  // react hooks form    
  // const { register, handleSubmit } = useForm();
  // const onSubmit = data => console.log(data);

  api.get('/').then(res => {
    alert();
  })

  return (
    <Switch>
      <ProtectedRoute
        exact
        path='/'
        component={Citas}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path='/Contact' component={Contact} />
      <Route path='/Login' component={Login} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/mensaje' component={Msg} />
    </Switch>
  )
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  }
}

export default connect(mapStateToProps)(App)
