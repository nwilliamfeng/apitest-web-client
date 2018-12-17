
import styled from 'styled-components'

export const ColumnFlexDiv = styled.div`
    display:flex;
    width:100%;

`

export const Img = styled.img`
     
    width:${props => props.width ? `${props.width}px` : '16px'};
    height:${props => props.height ? `${props.height}px` : '16px'};
  
`

export const ClickImg = styled(Img)`
    opacity:0.6;
 
    &:hover{
        opacity:1;
    }
    cursor: pointer;
    &:active{
        background:	#F5F5F5;
        border-radius:24px;
    }
`

export const ButtonDiv = styled.div`
    opacity:0.8;
    color:#4169E1;
    padding:1px 3px;
    &:hover{
        opacity:1;
    }
    cursor: pointer;
    &:active{
        background:	#F5F5F5;
    }
`

export const PostIdInput=styled.input`
    width:200px;
    height:24px;
    padding:2px 6px;
     
`

export const Span=styled.span`
    text-align:${props=>props.position?props.position:'center' };
    margin:${props=>props.margin?props.margin:'0px'};
    color:${props=>props.color?props.color:'black'};
    font-size:${props=>props.fontSize?props.fontSize:'12px'};
    padding:${props=>props.padding?props.padding:'0px'};
    background:${props=>props.background?props.background:'transparent'};
`

export const Linker=styled.a`
    text-decoration:none; 
    font-size:${props=>props.fontSize?props.fontSize:'12'};
`