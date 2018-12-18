import React, { Component } from 'react'

import { commentActions } from '../actions'
import { connect } from 'react-redux';
import { Pages } from '../constants'
import styled from 'styled-components'
import {ArticleNewList} from './ArticleNewList'
import { CommentList } from './CommentList'
import { cookieUtil } from '../utils'
import { ButtonDiv } from './parts'

const ContainerDiv = styled.div`
    display:flex;
    height:100%;
    flex-direction:column;
    justify-content:center;
    width:100%;
     
    align-items:center;
`

class Home extends Component {

    componentDidMount() {
      
        console.log('ct:' + cookieUtil.getCookieValue('ct'))
        
    }

    handleReplyClick=()=>{
        const { dispatch } = this.props;
        dispatch(commentActions.directToPage(Pages.COMMENT));
    }

    handlePostListClick=()=>{
        const { dispatch } = this.props;
        dispatch(commentActions.directToPage(Pages.POST));
    }

    renderCommandList = () => {
        const { page } = this.props;
        if (page !== Pages.HOME) {
            return <React.Fragment />
        }
        return <ContainerDiv>
            <ContainerDiv style={{width:160}}>
                <h3>{'股吧服务测试'}</h3>
                <ButtonDiv width={'72px'} onClick={this.handleReplyClick}>{'评论测试'}</ButtonDiv>
                <ButtonDiv width={'96px'} onClick={this.handlePostListClick}>{'贴子列表测试'}</ButtonDiv>
            </ContainerDiv>

        </ContainerDiv>
    }

    render() {
        const { page } = this.props;
        return <React.Fragment>
            {this.renderCommandList()}
           
            <CommentList />
            <ArticleNewList/>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const { page } = state.comment;
    return { page };
}


const container = connect(mapStateToProps)(Home)

export { container as Home }