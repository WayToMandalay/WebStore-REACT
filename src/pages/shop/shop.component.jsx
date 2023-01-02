import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

import {connect} from 'react-redux'
import {addCollectionsAsync} from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import {createStructuredSelector} from 'reselect'
import {selectIsFetching} from '../../redux/shop/shop.selectors'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

const ShopPage = ({match, addItemsAsync, isFetching}) => {

    useEffect(() => {
        addItemsAsync()
    }, [])

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`}
                   render={(props) => <CollectionsOverviewWithSpinner isLoading={isFetching} {...props}/>}/>
            <Route path={`${match.path}/:collectionId`}
                   render={(props) => <CollectionPageWithSpinner isLoading={isFetching} {...props}/>}/>
        </div>
    )

}

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsFetching
})

const mapDispatchToProps = dispatch => ({
    addItemsAsync: () => dispatch(addCollectionsAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
