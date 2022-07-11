import React, {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router'

import './App.css'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'

function App() {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user)
            createUserProfileDocument(user)
        })

    }, [])

    return (
        <div>
            <Header currentUser={currentUser}/>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="/shop" element={<ShopPage/>}/>
                <Route path="/signin" element={<SignInAndSignUpPage/>}/>
            </Routes>
        </div>
    )
}

export default App
