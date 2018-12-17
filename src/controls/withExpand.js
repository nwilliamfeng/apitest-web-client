import React, { Component } from 'react'
import styled from 'styled-components'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronRight as arrowRight, faChevronDown as arrowDown } from '@fortawesome/free-solid-svg-icons'
import {HoverDiv} from './parts'


const HeaderDiv = styled(HoverDiv)`
    display:flex;
    width:100%;
    padding:0px 6px;
    padding-left:${props=>props.paddingLeft?`${props.paddingLeft}px`:'6px'};
   
`

const BodyDiv = styled.div`
    padding: 0px 0px 5px 30px;
    background:white;
    color: gray;
`

const ArrowDiv = styled.div`  
    width:16px;
    padding-top:3px;
    color:gray;
    &:hover{
        color:black;
    };
 `

export const withExpand = WrapperComponent => class extends Component {

    handleDoubleClick = () => {
        const { children, handleExpand, isExpand } = this.props;
        if (children && handleExpand != null) {
            handleExpand(!isExpand);
        }
    }

    render() {
        const { isExpand,paddingLeft,handleClick } = this.props;
        return <React.Fragment>
            <HeaderDiv onDoubleClick={this.handleDoubleClick} paddingLeft={paddingLeft} onClick={handleClick}>
                <ArrowDiv onClick={this.handleDoubleClick}>
                    {/* {this.props.children && <FontAwesomeIcon icon={isExpand === true ? arrowDown : arrowRight} size='xs' />} */}
                </ArrowDiv>
                <WrapperComponent {...this.props} {...isExpand} />
            </HeaderDiv>

            {this.props.children &&
                <BodyDiv {...this.props}>
                    {this.props.children}
                </BodyDiv>
            }
        </React.Fragment>

    }
}