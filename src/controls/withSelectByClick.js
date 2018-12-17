import React, { Component } from 'react'
import styled from 'styled-components'

const Div = styled.div`
  
    background-color:${props => props.isSelected === true ? '#C4C4C5' : 'transparent'};
    color: ${props => props.isSelected === true ? 'black' : 'gray'};
    width:100%;
`

export const withSelectByClick = WrapperComponent => class extends Component {
    render() {
 
        return <Div {...this.props}>
            <WrapperComponent {...this.props} />
        </Div>
    }
}