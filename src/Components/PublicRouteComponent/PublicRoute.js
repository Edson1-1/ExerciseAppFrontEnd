import React from 'react';
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({ component, ...rest }) => {
    const Component = component
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    let isAuthenticated
    (token) ? isAuthenticated = true : isAuthenticated = false;

    return (<Route {...rest} component={(props) => (isAuthenticated ? (
        (role === 'admin') ?
            <Redirect to='/main' />
            :
            <Redirect to='/client' />

    ) : (
            <Component {...props} />
        ))
    } />)
}

export default PublicRoute