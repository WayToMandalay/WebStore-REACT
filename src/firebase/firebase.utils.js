import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, collection, getDocs, setDoc} from 'firebase/firestore'


const config = {
    apiKey: 'AIzaSyDxw0hdYY-GDtrgJVhcr5oWTrR1Jou1wKE',
    authDomain: 'my-webstore-550cd.firebaseapp.com',
    projectId: 'my-webstore-550cd',
    storageBucket: 'my-webstore-550cd.appspot.com',
    messagingSenderId: '1032488480243',
    appId: '1:1032488480243:web:afef326e0ef4332522f686',
    measurementId: 'G-PH1XMXZDBZ'
}

const app = initializeApp(config)

export const dataBase = getFirestore(app)


export const auth = getAuth(app)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})

export const signInWithGoogle = () => signInWithPopup(auth, provider)


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return
    const querySnapshot = await getDocs(collection(dataBase, `users`))

    let userRef = querySnapshot.docs.find((el) => {
        return el.id === userAuth.uid
    })

    if (!userRef) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(doc(dataBase, 'users', userAuth.uid), {
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                }
            )
        } catch (err) {
            console.log(`error is ${err}`)
        }
    }
    return userRef
}


