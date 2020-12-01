import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './LoggedInNavbar.css'


export default class LoggedInNavbar extends Component{

    render(){
        return (
            <div>
                <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to ='/' className = "navbar-brand">Home</Link>
                    <div className = 'navbar-collapse navLinks'>
                    <Link to ='/' className = "navbar-nav nav-link navLinks">Add exercise</Link>
                    <Link to ='/' className = "navbar-nav nav-link navLinks">View Exercise</Link>
                    </div>

                </nav>
            </div>
        )
    }
}