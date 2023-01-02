import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import {convertCollectionsSnapshotToMap, firestore} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
import {addCollections} from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

const ShopPage = ({match, addItems}) => {

    const [loading, setLoading] = useState(true)
    // const [unsubscribeFromSnapshot, setUnsubscribeFromSnapshot] = useState(null)

    // const unsubscribeFromSnapshot = null

    useEffect(() => {
        const collectionRef = firestore.collection('collections')

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            addItems(collectionsMap)
            setLoading(false)
        })
    }, [])

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`}
                   render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}/>
            <Route path={`${match.path}/:collectionId`}
                   render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    addItems: item => dispatch(addCollections(item))
})

export default connect(null, mapDispatchToProps)(ShopPage)
