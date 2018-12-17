import React from 'react'


export const withLoading = (Component,info )=> props => <Component {...props}>
         {'正在加载中'+info}
    </Component>
