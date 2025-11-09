import { useState, useEffect } from 'react'
import { firebaseAuth } from '../../utils/shared/firebase'
import { User } from 'firebase/auth'

type TypeUser = {
    isSignedIn: boolean,
    pending: boolean,
    user: User | null
}

export function useAuth() {
    const [authState, setAuthState] = useState<TypeUser>({
        isSignedIn: false,
        pending: true,
        user: null
    })

    useEffect(() => {
        const unregisterAuthObserver = firebaseAuth.onAuthStateChanged(user =>
            setAuthState({ user, pending: false, isSignedIn: !!user })
        )
        return () => unregisterAuthObserver()
    }, [])

    return { firebaseAuth, ...authState }
}