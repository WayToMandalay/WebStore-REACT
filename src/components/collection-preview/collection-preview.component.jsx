import React from 'react'

import CollectionItem from '../collection-item/collection-item.component'

import './collection-preview.styles.scss'
import {withRouter} from 'react-router-dom'

const CollectionPreview = ({title, items, routeName, match, history}) => {
    return (
        <div className="collection-preview">
            <h1 className="title" onClick={() => history.push(`${match.path}/${routeName}`)}>{title.toUpperCase()}</h1>
            <div className="preview">
                {items
                    .filter((item, idx) => idx < 4)
                    .map(item => (
                        <CollectionItem key={item.id} item={item}/>
                    ))}
            </div>
        </div>
    )
}


export default withRouter(CollectionPreview)
