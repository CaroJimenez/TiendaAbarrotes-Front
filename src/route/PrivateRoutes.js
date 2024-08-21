import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function PrivateRoute({children}) {

    const { pathname } = useLocation();

    if(localStorage.getItem('role') === 'Admins'){
        return children
    }else{
        return <Navigate to={{pathname: '/', state: {from: pathname}}} />
    }

}