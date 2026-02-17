import React, { useState, useEffect } from 'react'
import usesechandStore from '../store/sechand-store'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'


const ProtectRouteUser = ({ element }) => {
    const [ok, setOk] = useState(false)
    const user = usesechandStore((state) => state.user)
    const token = usesechandStore((state) => state.token)

    useEffect(() => {
        if (user && token) {
            currentUser(token)
                .then((res) => setOk(true))
                .catch((err) => setOk(false))
        }
    }, [])

    return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteUser