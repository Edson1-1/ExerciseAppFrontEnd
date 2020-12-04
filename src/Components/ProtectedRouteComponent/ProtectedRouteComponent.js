
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import RoleBasedRouting from '../RoleBasedAuthorization/RoleBasedRouting'


const ProtectedRoute = ({
    component, role, ...rest
}) => {
        const Component = component;
        const token= localStorage.getItem('token')
        let isAuthenticated
        (token) ? isAuthenticated = true : isAuthenticated = false;
       
        return (
            <Route {...rest} component = {(props) => (
                isAuthenticated ? (
                    <RoleBasedRouting {...props} role = {role} component = {Component} />
                ) :
                (
                    <Redirect to = '/login' />
                )
            )} />
        )
}

export default ProtectedRoute;