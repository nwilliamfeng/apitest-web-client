import React, { Component } from 'react'
import { commentActions } from '../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColumnFlexDiv, PostIdInput } from './parts'
import { Reply, PageNavigator } from './Reply'
import { ReplyList } from './ReplyList'
import { withScroll } from '../controls'

import { Pages } from '../constants';


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
    width:500px;
    max-width:500px;
`

const ReplyListDiv = styled.div`
    width:100%;
    /* background:	#F5F5F5; */
`


const ReplyListContainer = withScroll(props => <ReplyListDiv {...props} />)

const ListHeaderDiv = styled.div`
    display:flex;
    justify-content: space-between;
    color:gray;
    margin-top:10px;
    margin-bottom:10px;
`

class CommentList extends Component {

    constructor(props) {
        console.log('create commentList');
        super(props);
        this.state = { comments: [], pageCount: 0 };
    }

    // componentDidMount() {
    //     const { dispatch, commentSortType, commentPage, commentPageSize } = this.props;
    //     dispatch(commentActions.loadCommentList(commentSortType, commentPage, commentPageSize));
    // }


    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps != null) {
            const { commentPageSize, commentData } = nextProps;
            const pageCount = Math.ceil(commentData.count / commentPageSize);

            this.setState({ comments: nextProps.commentData.re, pageCount: pageCount });
        }
    }

    sortComments = () => {
        const { commentSortType, commentPageSize, commentPage, postId } = this.props;
        const nwSortType = commentSortType === -1 ? 1 : -1;
        this.props.dispatch(commentActions.loadCommentList(postId, nwSortType, commentPage, commentPageSize));
    }

    loadNextPage = () => {
        const { commentSortType, commentPageSize, commentPage, postId } = this.props;
        if (commentPage >= this.state.pageCount) {
            alert('已经是最后一页了');
            return;
        }
        this.props.dispatch(commentActions.loadCommentList(postId, commentSortType, commentPage + 1, commentPageSize));
    }

    loadPreviousPage = () => {
        const { commentSortType, commentPageSize, commentPage, postId } = this.props;
        if (commentPage === 1) {
            alert('已经是第一页了');
            return;
        }
        this.props.dispatch(commentActions.loadCommentList(postId, commentSortType, commentPage - 1, commentPageSize));
    }

    inputKeyPress = e => {
        if (e.nativeEvent.keyCode === 13) { //e.nativeEvent获取原生的事件对像
            const postId = this.postIdInput.value;
            const { commentSortType, commentPageSize, commentPage, dispatch } = this.props;
            dispatch(commentActions.loadCommentList(postId, commentSortType, commentPage, commentPageSize));
        }
    }


    render() {
        console.log('render comment list');
        const { page, commentData, commentSortType, replyPageSize, postId ,dispatch} = this.props;
        if(page===Pages.REPLY){
           return  <ReplyList />
        }
        if (page !== Pages.COMMENT) {
            return <React.Fragment />
        }
       
        const { rc, count, me } = commentData;
        const { comments } = this.state;
        return <Div>
            <ListHeaderDiv>
                <div style={{ fontWeight: 'bold' }}> {`评论${count}`}</div>
                <PostIdInput ref={el => this.postIdInput = el} onKeyPress={this.inputKeyPress} placeholder="请输入贴子id"></PostIdInput>
                <div onClick={this.sortComments} style={{ color: '#4169E1', cursor: 'pointer' }}>{commentSortType === -1 ? '智能排序' : '时间排序'}</div>
            </ListHeaderDiv>
            {rc === 1 && <ReplyListContainer>
                {comments && comments.map(x => <Reply key={x.reply_id} {...x} replyPageSize={replyPageSize} postId={postId} dispatch={dispatch}/>)}
            </ReplyListContainer>}
            {rc === 0 && <InfoDiv> {`加载评论消息失败：${me}`} </InfoDiv>}
            {count > 0 && <PageNavigator pageCount={this.state.pageCount} onPreviousClick={this.loadPreviousPage} onNextClick={this.loadNextPage} />}

        </Div>
    }
}

function mapStateToProps(state) {
    const { commentData, page, commentPage, commentPageSize, replyPageSize, commentSortType, postId } = state.comment;
    return { commentData, page, commentPage, commentPageSize, replyPageSize, commentSortType, postId };
}


const commentList = connect(mapStateToProps)(CommentList)

export { commentList as CommentList }