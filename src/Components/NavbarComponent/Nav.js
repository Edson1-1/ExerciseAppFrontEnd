import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'


export default class Navbar extends Component{
    

    render(){
        if(!this.props.isLoggedin){

        return (
            <div>
                <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to ='/' className = "navbar-brand">Home</Link>
                    <div className = 'navbar-collapse navLinks'>
                    <Link to ='/login' className = "navbar-nav nav-link navLinks">Login</Link>
                    <Link to ='/register' className = "navbar-nav nav-link navLinks">Register</Link>
                    </div>

                </nav>
            </div>
        )}else{

            return (
                <div>
                    <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                        <Link to ='/' className = "navbar-brand">Home</Link>
                        <div className = 'navbar-collapse navLinks'>
                        <Link to ='/exercise' className = "navbar-nav nav-link navLinks">Exercises</Link>
                        <Link to ='/equipment' className = "navbar-nav nav-link navLinks">Equipments</Link>
                        <Link to ='/customer' className = "navbar-nav nav-link navLinks">Customers</Link>
                        </div>
                        <button onClick = {this.props.onLogOut} className = "btn btn-warning">Logout</button>

    
                    </nav>
                </div>
            )}
    }
}