import React from 'react'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import './cart-dropdown.styles.scss'
import {connect} from 'react-redux'
import {selectCartItems} from '../../redux/cart/cart.selectors'

const CartDropdown = ({cartItems}) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {cartItems.map((el, id) => {
                    return <CartItem key={id} item={el}/>
                })}
            </div>
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})
export default connect(mapStateToProps, null)(CartDropdown)
