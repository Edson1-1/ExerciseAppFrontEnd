import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import Login from './Components/loginComponent/login'
import Register from './Components/registerComponent/register'
import Main from './Components/MainComponent/main'
import Navbar from './Components/NavbarComponent/Nav'
import ProtectedRoute from './Components/ProtectedRouteComponent/ProtectedRouteComponent'
import Exercise from './Components/ExerciseComponent/Exercise'
import Equipment from './Components/EquipmentComponent/Equipment'
import AddEquipment from './Components/AddorUpdateEquipmentComponent/AddEquipment'


import './App.css';
import AddExercise from './Components/AddorUpdateExerciseComponent/AddExercise'
import User from './Components/UserComponent/user'
import Error404 from './Components/404pageComponent/Error404'
import Client from './Components/clientComponent/Client'

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
        <Router>
          <Navbar isLoggedin={this.state.isLoggedin} onLogOut={() => { this.onLogOut() }} />

          <Switch>
            <Route path='/login' render={(props) => <Login {...props} onLoggingIn={this.onLoggingIn} />} />
            <Route path='/register' render={(props) => <Register {...props} onLoggingIn={this.onLoggingIn} />} />
            <ProtectedRoute exact path='/exercise' component={Exercise} />
            <ProtectedRoute exact path='/equipment' component={Equipment} />
            <Route path='/equipment/add' render={(props) => <ProtectedRoute {...props} component={AddEquipment} />} />
            <Route path='/equipment/update/:id' render={(props) => <ProtectedRoute {...props} component={AddEquipment} />} />
            <Route path='/exercise/update/:id' render={(props) => <ProtectedRoute {...props} component={AddExercise} />} />
            <Route path='/exercise/add' render={(props) => <ProtectedRoute {...props} component={AddExercise} />} />
            <Route path='/customer' render={(props) => <ProtectedRoute {...props} component={User} />} />
            <ProtectedRoute exact path='/' component={Main} />
            <Route exact path ='/client' render = { (props) => <ProtectedRoute {...props}  component = {Client}/>} />
            <Route component={Error404} />
          </Switch>

        </Router>
      </div>

    );
  }
}

