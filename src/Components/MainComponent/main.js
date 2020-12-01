
import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import './main.css'



export default class Main extends Component {


render(){
    return(
        <main>
            <h1>Hi Admin, Welcome to Exercise App</h1>
            <Link to = '/exercise' className = "btn btn-info button-main-margin">Exercise</Link>
            <p></p>
            <Link to = '/equipment' className = "btn btn-info button-main-margin">Equipment</Link>
            <p></p>
            <Link to = '/customer' className = "btn btn-info button-main-margin">Customer</Link>

        </main>
    )
}
}