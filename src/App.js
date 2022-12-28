import React, {useEffect, useState} from 'react'
import {Routes, Route, Navigate} from 'react-router'
import './App.css'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'

function App({currentUser, setCurrentUser}) {

    let unsubscribeFromAuth = null

    useEffect(() => {
        unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)
                if (userRef) {
                    setCurrentUser({
                        id: userRef.id,
                        ...userRef.data()
                    })
                } else {
                    setCurrentUser(userAuth)
                }

            } else {
                setCurrentUser(userAuth)
            }
        })

        return () => unsubscribeFromAuth()

    }, [])

    return (
        <div>
            <Header/>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="/shop" element={<ShopPage/>}/>
                <Route exact path="/signin"
                       element={currentUser ? <Navigate to={'/'} replace={true}/> : <SignInAndSignUpPage/>}
                />
            </Routes>
        </div>
    )
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})


const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
