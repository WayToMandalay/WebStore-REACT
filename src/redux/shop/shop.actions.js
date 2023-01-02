import ShopTypes from './shop.types'
import {convertCollectionsSnapshotToMap, firestore} from '../../firebase/firebase.utils'

export const fetchCollectionStart = () => {
    return {
        type: ShopTypes.FETCH_COLLECTIONS_START
    }
}

export const fetchCollectionSuccess = (collection) => {
    return {
        type: ShopTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collection
    }
}

export const fetchCollectionFailure = (message) => {
    return {
        type: ShopTypes.FETCH_COLLECTIONS_FAILURE,
        payload: message
    }
}

export const addCollectionsAsync = () => (dispatch) => {
    dispatch(fetchCollectionStart())

    const collectionRef = firestore.collection('collections')

    collectionRef.get().then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        dispatch(fetchCollectionSuccess(collectionsMap))
    }).catch(error => dispatch(fetchCollectionFailure('Enable to reach')))
}

