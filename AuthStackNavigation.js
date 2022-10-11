
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { SignInStack, SignOutStack } from "./navigation";


export default function AuthStackNavigation() {
    const [currentUser, setCurrentUser] = useState(null)

    const userHandler = user => {
        user ? setCurrentUser(user) : setCurrentUser(null)
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => userHandler(user))
    }, [])

    return (<>
        {currentUser ? <SignInStack /> : <SignOutStack />}
    </>)
}