import React from 'react'
import { Link } from 'react-router-dom'
import './Unauthorized.css'


export default function Unauthorized() {

    return (
        <div className='container-fluid'>
            <div className="row error-page-child">
                <div className="col-sm sad-face ">
                </div>
                <div className='col-6'>
                    <h1 > 401</h1>
                    <h2>Ooops!!</h2>
                    <p>Unauthorized</p>
                    <Link to='/' className='btn btn-primary'>Go to home page</Link>
                </div>
                <div className='col'></div>
            </div>
        </div>
    )
}