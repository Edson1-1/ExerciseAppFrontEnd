import { Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import Login from './Components/loginComponent/login'
import Register from './Components/registerComponent/register'
import Main from './Components/MainComponent/main'
import Navbar from './Components/NavbarComponent/Nav'
import ProtectedRoute from './Components/ProtectedRouteComponent/ProtectedRouteComponent'
import PublicRoute from './Components/PublicRouteComponent/PublicRoute'
import Exercise from './Components/ExerciseComponent/Exercise'
import Equipment from './Components/EquipmentComponent/Equipment'
import AddEquipment from './Components/AddorUpdateEquipmentComponent/AddEquipment'
import {createBrowserHistory} from 'history';

import './App.css';
import AddExercise from './Components/AddorUpdateExerciseComponent/AddExercise'
import User from './Components/UserComponent/user'
import Error404 from './Components/404pageComponent/Error404'
import Client from './Components/clientComponent/Client'
import LogExercise from './Components/LogExerciseComponent/LogExercise'


export const history = createBrowserHistory();



export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedin: false,
      role: ''
    }
    this.onLoggingIn = this.onLoggingIn.bind(this)
    this.onLogOut = this.onLogOut.bind(this)
  }
  componentDidMount() {
    if (localStorage.getItem('token')) {
      const role = localStorage.getItem('role')
      if(role){
        this.setState({role})
      }
      this.setState({ isLoggedin: true })
    } else {
      this.setState({ isLoggedin: false })
    }
  }

  onLoggingIn() {
    const role = localStorage.getItem('role')
    this.setState({ isLoggedin: true, role})
  }
  
  onLogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')

    this.setState({ isLoggedin: false, role: '' })
  }
  render() {
    
    return (
      <div className='App'>
        <Router history = {history}>
          <Navbar role = {this.state.role} isLoggedin={this.state.isLoggedin} onLogOut={() => { this.onLogOut() }} />

          <Switch>
            <PublicRoute path='/login' component = { (props) => <Login {...props} onLoggingIn={this.onLoggingIn} />} />
            <PublicRoute path='/register' component={ (props) => <Register {...props} onLoggingIn={this.onLoggingIn} />} />

            <ProtectedRoute exact path='/exercise' component={Exercise} role = {['admin']} />
            <ProtectedRoute exact path='/equipment' component={Equipment} role = {['admin']} />
            <ProtectedRoute exact path='/equipment/add' role = {['admin']} component = {AddEquipment} />
            <ProtectedRoute path='/equipment/update/:id' role = {['admin']} component= {AddEquipment} />
            <ProtectedRoute path='/exercise/update/:id' role = {['admin']} component={AddExercise} /> 
            <ProtectedRoute exact path='/exercise/add' role = {['admin']} component={AddExercise} />
            <ProtectedRoute exact path='/customer' role = {['admin']} component={User} />
            <ProtectedRoute exact path='/' role = {['admin','customer']} component={Main} />


            <ProtectedRoute exact path = '/client' role = {['customer']} component = {Client}/>
            <ProtectedRoute exact path = '/client/logexercise' role = {['customer']} component = {LogExercise}/>



            <Route component={Error404} />
          </Switch>

        </Router>
      </div>

    );
  }
}

