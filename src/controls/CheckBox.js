import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
    height:12px;
    font-size:10px;
    font-family:sans-serif;
    width:12px;
    
    border:1px solid black;
    &:hover{
        border-color:dodgerblue;
    }
    &:hover .svg{
        fill:dodgerblue;
    }
`


const Svg = styled.svg`
    width:10px;
    height:10px;
    
     &:hover{
        border-color:dodgerblue;
    }
`



export const CheckBox = props => {

    const { isChecked = false, handleCheck } = props;
    const handleClick = e => {
        e.stopPropagation();
        if (handleCheck != null) {
            handleCheck(!isChecked)
        }
    }
    return <Div onClick={handleClick} {...props}>
      {isChecked===true && <Svg className='svg' viewBox="100 300 1024 1024" fill={'black'} ><path d="M824.66816 299.58144L429.54752 694.70208l-190.32064-190.32064a20.45952 20.45952 0 1 0-28.95872 28.95872l204.8 204.8a20.41856 20.41856 0 0 0 28.95872 0l409.6-409.6a20.45952 20.45952 0 1 0-28.95872-28.95872z" ></path></Svg>}
    </Div>
}

