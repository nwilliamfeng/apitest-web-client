import React, { Component } from 'react'
import styled from 'styled-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronRight as arrowRight, faChevronDown as arrowDown } from '@fortawesome/free-solid-svg-icons'
import {HoverDiv} from './parts'

const HeaderDiv = styled(HoverDiv)`
    display:flex;
    width:100%;
    padding:0px 6px;
    padding-left:${props => props.paddingLeft ? `${props.paddingLeft}px` : '6px'};
   
`

const BodyDiv = styled.div`
    padding: 0px 0px 5px 30px;
    color: gray;
    background:white;
`

const ArrowDiv = styled.div`  
    width:16px;
    padding-top:3px;
    color:gray;
    &:hover{
        color:black;
    };
 `

export const withSimpleExpand = WrapperComponent => class extends Component {

    constructor(props) {
        super(props);
        this.state = { isExpand: true };
    }

    handleDoubleClick = () => {
        const { children } = this.props;
        if (children) {
            const { isExpand } = this.state;
            this.setState({ isExpand: !isExpand });
        }

    }

    render() {
        const { isExpand } = this.state;
        const { paddingLeft ,handleClick} = this.props;
        return <React.Fragment>
            <HeaderDiv onDoubleClick={this.handleDoubleClick} paddingLeft={paddingLeft} onClick={handleClick}>
                <ArrowDiv onClick={this.handleDoubleClick}>
                    {/* {this.props.children && <FontAwesomeIcon icon={isExpand === true ? arrowDown : arrowRight} size='xs' />} */}
                </ArrowDiv>
                <WrapperComponent {...this.props} {...isExpand} />
            </HeaderDiv>

            {isExpand === true && this.props.children &&
                <BodyDiv>
                    {this.props.children}
                </BodyDiv>}

        </React.Fragment>

    }
}