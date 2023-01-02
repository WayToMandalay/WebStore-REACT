import React from 'react'

import {MyCustomButton} from './custom-button.styles'

const CustomButton = ({children, ...props}) => (
    <MyCustomButton
        {...props}
    >
        {children}
    </MyCustomButton>
)

export default CustomButton
