import React from 'react'
import { Link } from 'react-router-dom'
import './Error404.css'


export default function Error404() {

    return (
        <div className='container-fluid'>
            <div className="row error-page-child">
                <div className="col-sm sad-face ">
                </div>
                <div className='col-6'>
                    <h1 > 404</h1>
                    <h2>Ooops!!</h2>
                    <p>THAT PAGE DOES NOT EXIST OR IS NOT AVAILABLE</p>
                    <Link to='/' className='btn btn-primary'>Go to home page</Link>
                </div>
                <div className='col'></div>
            </div>
        </div>
    )
}