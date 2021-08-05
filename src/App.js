import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'
import Login from './components/login/Login'
import Citas from './components/citas/Citas'
import Edit from './components/citas/Edit'
import Contact from './components/contact/Contact'
import Msg from './components/contact/Msg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


function App (props) {
  const { isAuthenticated, isVerifying } = props
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
