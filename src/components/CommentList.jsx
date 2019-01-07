import React, { Component } from 'react'
import { commentActions } from '../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColumnFlexDiv, PostIdInput,Input } from './parts'
import { Comment } from './Reply'
import { ReplyList } from './ReplyList'
import { withScroll , PageNavigator} from '../controls'
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
        this.state = {isLoading:false, comments: [], pageCount: 0 ,sortType:-1,pageSize:20};
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps);
        const { pageSize } = this.state;
        if (nextProps != null )   {
            const {  commentData } = nextProps;
            const pageCount = Math.ceil(commentData.count / pageSize);

            this.setState({ comments: nextProps.commentData.re, pageCount: pageCount,isLoading:false });
        }
    }

    sortComments = () => {
        const {   commentPage, postId,searchType } = this.props;
        const {sortType,pageSize,}=this.state;
        const nwSortType = sortType === -1 ? 1 : -1;
        this.setState({sortType:nwSortType,isLoading:true});
        this.props.dispatch(commentActions.loadCommentList(postId,searchType, nwSortType, commentPage, pageSize));
    }

   
    handleNavigatePage = (pageIdx,size) => {
        const {   pageSize,  sortType } = this.state; 
        if(size!=null && size!==pageSize){
            this.setState({pageSize:size,isLoading:true});
        }
        const {postId,searchType} =this.props;    
        this.props.dispatch(commentActions.loadCommentList(postId,searchType, sortType, pageIdx, size));
    }


    inputKeyPress = e => {
        if (e.nativeEvent.keyCode === 13) { //e.nativeEvent获取原生的事件对像
            const postId = this.postIdInput.value;
            const type= this.typeInput.value;
            this.setState({ pageCount: 0,isLoading:true,  });
            const {   dispatch } = this.props;
            const {sortType,pageSize,} =this.state;

            dispatch(commentActions.loadCommentList(postId,type, sortType, 1, pageSize));

        }
    }

   

    render() {
        console.log('render comment list');
        const { page, commentData, searchType, replyPageSize, postId ,dispatch,commentPage} = this.props;
        const {sortType,isLoading}=this.state;
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
                <Input ref={el => this.typeInput = el} style={{marginLeft:10}} onKeyPress={this.inputKeyPress} placeholder="请输入帖子类型"></Input>
                <div onClick={this.sortComments} style={{ color: '#4169E1', cursor: 'pointer' }}>{sortType === -1 ? '智能排序' : '时间排序'}</div>
            </ListHeaderDiv>
            {isLoading===false && rc === 1 && <ReplyListContainer>
                {comments && comments.map(x => <Comment key={x.reply_id} {...x} replyPageSize={replyPageSize} searchType={searchType} postId={postId} dispatch={dispatch}  />)}
            </ReplyListContainer>}
            {isLoading===true && <InfoDiv> {'正在加载中，请稍候...'} </InfoDiv>}
            {isLoading===false && rc === 0 && <InfoDiv> {`加载评论消息失败：${me}`} </InfoDiv>}
            {isLoading===false && count > 0 && <PageNavigator style={{width:200}} pageIdx={commentPage} pageSize={this.state.pageSize} pageCount={this.state.pageCount} onNavigate={this.handleNavigatePage}/>}
        </Div>
    }
}

function mapStateToProps(state) {
    //  const { commentData, page, commentPage,  replyPageSize,  postId } = state.comment;
    // return { commentData, page, commentPage,  replyPageSize,  postId };
    return {...state.comment}
}

const commentList = connect(mapStateToProps)(CommentList)

export { commentList as CommentList }