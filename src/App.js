import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React, {Component} from 'react'
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

export default class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      isLoggedin:false
    }
    this.onLoggingIn = this.onLoggingIn.bind(this)
    this.onLogOut = this.onLogOut.bind(this)
  }
  componentDidMount(){
    if(localStorage.getItem('token')){
      this.setState({isLoggedin: true})
    }else{
      this.setState({isLoggedin: false})
    }
  }
  
  onLoggingIn(){
    this.setState({isLoggedin: true})
  }
  onLogOut(){
    localStorage.removeItem('token')
    this.setState({isLoggedin: false})
  }
  render(){
  return (
    <div className = 'App'>
    <Router>
        <Navbar isLoggedin = {this.state.isLoggedin} onLogOut = {() => { this.onLogOut()}}/>
      <Switch>
        <Route path = '/login'  render = {(props) => <Login {...props} onLoggingIn = {this.onLoggingIn} />}/>
        <Route path = '/register'  render = {(props) => <Register {...props} onLoggingIn = {this.onLoggingIn}/>}/>
        <ProtectedRoute exact path = '/exercise' component = {Exercise}/>
        <ProtectedRoute exact path = '/equipment' component = {Equipment}/>
        <Route path = '/equipment/add' render = {(props) => <ProtectedRoute {...props} component = {AddEquipment}/>} />
        <Route path = '/equipment/update/:id' render = {(props) => <ProtectedRoute {...props} component = {AddEquipment}/>} />
        <Route path = '/exercise/update/:id' render = {(props) => <ProtectedRoute {...props} component = {AddExercise}/>} />
        <Route path = '/exercise/add' render = {(props) => <ProtectedRoute {...props} component = {AddExercise}/>} />
        <Route path = '/customer' render = {(props) => <ProtectedRoute {...props} component = {User}/>} />
        <ProtectedRoute exact path = '/' component = {Main}/>
        <Route component = {Error404}/>


        {/* <ProtectedRoute  path = '/exercise/add' component = {AddExercise}/>
        <ProtectedRoute  path = '/exercise/update/:id' component = {AddExercise}/> */}
      </Switch>
    </Router>
    </div>
    
  );
}
}

