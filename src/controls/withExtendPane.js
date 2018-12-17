import React, { Component } from 'react'
import styled from 'styled-components'


const Container = styled.div`
     width:100%;
    background:#F5F5F5; 
    padding-left:5px;
    padding-right:5px;  
    display:flex;
    flex-direction:column;
    `

export const withExtendPane = WrapperComponent => class extends Component {

    handleClick = () => {
       const {onCloseHandle}=this.props
       if(onCloseHandle!=null)
            onCloseHandle()
    }

    render() {
        return <Container>
            <button onClick={this.handleClick}>{'close'}</button>
            <WrapperComponent {...this.props} />
        </Container>
    }
}