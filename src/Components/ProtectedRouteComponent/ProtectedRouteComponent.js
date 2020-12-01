
import React from 'react'
import { Redirect } from 'react-router-dom'


class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const token= localStorage.getItem('token')
        let isAuthenticated
        (token) ? isAuthenticated = true : isAuthenticated = false;
       
        return isAuthenticated ? (
            <Component {...this.props}/>
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default ProtectedRoute;