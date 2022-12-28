export const addItemToCart = (cartItems, item) => {
    const existingFiles = cartItems.find(i => i.id === item.id)

    if (existingFiles) {
        return cartItems.map(elem => elem.id === item.id
            ? {...elem, quantity: elem.quantity + 1}
            : {...elem}
        )
    }

    return [...cartItems, {...item, quantity: 1}]
}
