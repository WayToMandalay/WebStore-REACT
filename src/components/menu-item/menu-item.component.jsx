import React from 'react'

import './menu-item.styles.scss'
import {useLocation, useNavigate} from 'react-router'

const MenuItem = ({title, imageUrl, size, linkUrl}) => {

    let nav = useNavigate()

    return (
        <div
            className={`${size} menu-item`}
            onClick={() => nav(`${linkUrl}`)}
            // onClick={() => history.push(`${match.url}${linkUrl}`)}
        >
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
}

export default MenuItem
