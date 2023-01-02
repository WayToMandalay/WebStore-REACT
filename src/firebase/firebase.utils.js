import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: 'AIzaSyDxw0hdYY-GDtrgJVhcr5oWTrR1Jou1wKE',
    authDomain: 'my-webstore-550cd.firebaseapp.com',
    databaseURL: 'https://my-webstore-550cd-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'my-webstore-550cd',
    storageBucket: 'my-webstore-550cd.appspot.com',
    messagingSenderId: '1032488480243',
    appId: '1:1032488480243:web:afef326e0ef4332522f686',
    measurementId: 'G-PH1XMXZDBZ'
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date()
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data()

        return {
            id: doc.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items
        }
    })

    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}

// export const addCollectionsAndDocuments = async (collectionKey, array) => {
//     const collectionRef = firestore.collection(collectionKey)
//     console.log(collectionRef)
//
//     const batch = firestore.batch()
//     array.forEach(obj => {
//         const newDocRef = collectionRef.doc()
//         console.log(newDocRef)
//         batch.set(newDocRef, obj)
//     })
//     return await batch.commit()
// }

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
