import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function PrivateRouteUser({children}) {

    const { pathname } = useLocation();

    if(localStorage.getItem('role') === 'Users'){
        return children
    }else{
        return <Navigate to={{pathname: '/', state: {from: pathname}}} />
    }

}