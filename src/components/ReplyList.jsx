import React, { Component } from 'react'

import { commentActions } from '../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColumnFlexDiv, ClickImg, Img } from './parts'

import { isEqual } from 'lodash'
import { Reply, Comment} from './Reply'
import { withScroll,PageNavigator  } from '../controls'
import { Pages } from '../constants';

const backIconSrc = require('../assets/imgs/back.png')
const logoIconSrc = require('../assets/imgs/logo.jpg')

const InfoDiv = styled.div`
    display:flex;
   align-items:center;
    justify-content:center;
    height:100%;
     font-size:20px;
     color: gray;
`

const Div = styled.div`
    display:flex;
    height:100%;
    flex-direction:column;
    padding:10px;
`
 

const HeaderDiv = styled(ColumnFlexDiv)`
    margin:0px 0px 20px 0px;
   
`

const ReplyListDiv = styled.div`
    width:100%;
    /* background:	#F5F5F5; */
    
`

const ReplyListContainer = withScroll(props => <ReplyListDiv {...props} />)

const HeaderTitleDiv = styled.div`
    font-weight:bold;
    font-size:16px;
    text-align:center;
    padding:4px 0px;
    
    flex:0 1 100%;
   
`

const ListHeaderDiv = styled.div`
    display:flex;
    justify-content: space-between;
    color:gray;
    margin-top:10px;
    margin-bottom:10px;
`


class ReplyList extends Component {

    constructor(props) {
        console.log('create replyList');
        super(props);
        this.state={pageCount:0,sort:-1};
    }

    
    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps != null) {
            const { replyPageSize, replyData } = nextProps;
            const pageCount = this.state.pageCount === 0 ? Math.ceil(replyData.re.reply_count / replyPageSize) : this.state.pageCount;
            this.setState({  pageCount: pageCount });
        }

    }

    handleBackClick = e => {
        e.stopPropagation();
        const { dispatch } = this.props;
        dispatch(commentActions.directToPage(Pages.COMMENT));
    }

    

    handleNavigatePage = (pageIdx,size) => {
        const {     sort } = this.state; 
        const {postId,replyId } =this.props;  
         
        this.props.dispatch(commentActions.loadReplyList(postId,replyId, sort, pageIdx, size));
    }

    sortComments = () => {
        const {  replyPageSize, replyPage,postId,replyId } = this.props;
        const {sort} =this.state;
        const nwSortType = sort === -1 ? 1 : -1;
        this.setState({sort:nwSortType});
        this.props.dispatch(commentActions.loadReplyList(postId,replyId,nwSortType, replyPage, replyPageSize));
    }

    renderReplys = ({ re }) => {
        const { child_replys,reply_count } = re;
        return <React.Fragment>
            <HeaderDiv>
                <ClickImg alt='' title='返回' src={backIconSrc} height={32} width={32} onClick={this.handleBackClick} />
                <Img src={logoIconSrc} height={36} width={42} />
                <HeaderTitleDiv>{'评论详情'}</HeaderTitleDiv>
            </HeaderDiv>
            <div style={{ marginBottom: 20 }}>
                <Comment {...re} />
            </div>

            <ListHeaderDiv>
                <span>{ '全部回复'} <span style={{marginLeft:3,color:'#4169E1'}}>{`${reply_count}条`}</span></span>
                <div onClick={this.sortComments} style={{ color: '#4169E1', cursor: 'pointer' }}>{this.state.sort === -1 ? '智能排序' : '时间排序'}</div>
            </ListHeaderDiv>
            <ReplyListContainer>
                {child_replys && child_replys.map(x => <Reply key={x.reply_id} {...x} />)}
            </ReplyListContainer>
            {/* <PageNavigator pageCount={this.state.pageCount} onPreviousClick={this.loadPreviousPage} onNextClick={this.loadNextPage}/> */}
            <PageNavigator style={{width:200}}  pageSize={this.props.replyPageSize}  pageIdx={this.props.replyPage} pageCount={this.state.pageCount} onNavigate={this.handleNavigatePage}/>
        </React.Fragment>
    }



    render() {
        console.log('render reply list');
        const { replyData } = this.props;
        if (replyData == null) {
            return <InfoDiv>
                {'正在加载数据...'}
                <div style={{color:'blue'}} onClick={this.directToCommentPage}>{'点击返回'}</div>
            </InfoDiv>
        }
        const { rc, me, re } = replyData;
        return <Div>
            {rc === 0 && <InfoDiv> {`加载回复消息失败：${me}`} </InfoDiv>}
            {rc === 1 && this.renderReplys({ re })}
        </Div>
    }
}

function mapStateToProps(state) {
    const { replyData , replyPage, replyPageSize, postId,replyId} = state.comment;
    return { replyData, replyPage, replyPageSize, postId,replyId};
}


const replyList = connect(mapStateToProps)(ReplyList)

export { replyList as ReplyList }