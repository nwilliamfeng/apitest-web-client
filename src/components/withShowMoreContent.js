import React, { Component } from 'react'
import styled from 'styled-components'
import {ButtonDiv,ColumnFlexDiv} from './parts'


const ExpandContentDiv = styled.div`
    margin-top:8px;
    text-align:left;
`

const ContentDiv = styled(ExpandContentDiv)`   
    display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
   text-overflow:ellipsis;
   overflow: hidden;
`

const ShowMoreTextDiv = styled(ColumnFlexDiv)`
    justify-self: flex-start;
    align-items:flex-start;
    justify-content:flex-end;
    font-size:12px;
`

export const withShowMoreContent = WrapperContent => class extends Component {
    constructor(props){
        super(props);
        this.state={needContentExpand:false};
    }

    handleShowExpand = () => {
        this.setState({ needContentExpand: true });
    }

    render() {
        const {needContentExpand}=this.state;
        const {showMoreContent} =this.props;
        return <div>
            {needContentExpand === true && <ExpandContentDiv>
                <WrapperContent {...this.props}/>
            </ExpandContentDiv>}
            {needContentExpand === false && <ContentDiv>
                <WrapperContent {...this.props}/>
            </ContentDiv>}
            <ShowMoreTextDiv>
                {showMoreContent === true && needContentExpand === false && <ButtonDiv style={{ justifySelf: 'flex-end' }} onClick={this.handleShowExpand}>{'展开'}</ButtonDiv>}
            </ShowMoreTextDiv>
        </div>
    }

}