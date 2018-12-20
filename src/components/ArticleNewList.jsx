import React, { Component } from 'react'
import { commentActions } from '../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {  PostIdInput } from './parts'
import { withScroll, PageNavigator } from '../controls'
import { Pages } from '../constants';
import { NickName, WithVTag } from './user'
import {dateUtil} from '../utils'

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
    width:1200px;
    max-width:1200px;
`
const ListHeaderDiv = styled.div`
    display:flex;
    justify-content: space-between;
    color:gray;
    margin-top:10px;
    margin-bottom:10px;
`

const Tr = styled.tr`
    &:nth-child(even){
        background:	#FFFFE0;
    }
`

const Table = styled.table`
    width:100%;
`

const Td = styled.td`
    padding:5px 6px;
    text-align:left;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    font-size:${props => props.fontSize ? props.fontSize : '14px'};
    width:${props => props.width ? props.width : 'auto'};
    max-width:${props => props.width ? props.width : 'auto'};
`

const ListContainer = withScroll(props => <div {...props} style={{ width: '100%' }} />)

const PostUser = WithVTag(props => <NickName {...props} />)

class ArticleNewList extends Component {

    constructor(props) {
        console.log('create postList');
        super(props);
        this.state = { sort: -1, pageCount: 0, pageSize: 20, code: null,isLoading:false };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {  pageSize } = this.state;
        if (nextProps != null) {
            const { articleNewListData } = nextProps;
            this.setState({ pageCount: Math.ceil(articleNewListData.count / pageSize),isLoading:false });
        }
    }

   

    handleNavigatePage = (pageIdx,size) => {
        const { pageSize, code, sort } = this.state;
        if(size!=null && pageSize!==size){
            this.setState({pageSize:size,isLoading:true});
        }
        this.props.dispatch(commentActions.loadPostList(code, sort, pageIdx, size));
    }

    sortList = () => {
        const { code, pageSize, sort } = this.state;
        const { articleNewListPageIdx } = this.props;
        const nwSortType = sort === -1 ? 1 : -1;
        this.setState({ sort: nwSortType,isLoading:true });
        this.props.dispatch(commentActions.loadPostList(code, nwSortType, articleNewListPageIdx, pageSize));
    }

    renderListItem = (item, idx) => {

        const { post_comment_count, post_click_count, post_like_count, post_id, post_last_time, post_publish_time, post_title, post_user } = item;
        const { user_nickname, user_v } = post_user;

        return <Tr key={post_id}>
            <Td width={'60px'} fontSize={'12px'} >{idx}</Td>
            <Td width={'80px'} fontSize={'12px'} >{post_click_count}</Td>
            <Td width={'80px'} fontSize={'12px'} >{post_comment_count}</Td>
            <Td width={'80px'} fontSize={'12px'} >{post_like_count}</Td>
            <Td width={'300px'} title={post_title}><a href='#'>{post_title}</a></Td>
            <Td width={'140px'}> <PostUser nickName={user_nickname} isVUser={user_v > 0} /> </Td>
            <Td width={'120px'}>{dateUtil.dateFormat('MM-dd hh:mm', post_publish_time)}</Td>
            <Td width={'140px'}>{dateUtil.dateFormat('MM-dd hh:mm', post_last_time)}</Td>
        </Tr>
    }


    renderList = ({ re }) => {
        if (re == null) {
            return <React.Fragment />
        }
        return <ListContainer>
            <Table >
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>阅读</th>
                        <th>评论</th>
                        <th>点赞数</th>
                        <th style={{ textAlign: 'center' }}>标题</th>
                        <th>作者</th>
                        <th>发表日期</th>
                        <th>最后更新日期</th>
                    </tr>
                </thead>
                <tbody>{re.map((x, idx) => this.renderListItem(x, idx + 1))}</tbody>
            </Table>
        </ListContainer>
    }

    inputKeyPress = e => {
        if (e.nativeEvent.keyCode === 13) { //e.nativeEvent获取原生的事件对像
            const code = this.codeInput.value;
            this.setState({ pageCount: 0, pageIdx: 0, code,isLoading:true });
            const { sort, pageSize } = this.state;
            const { dispatch } = this.props;
            dispatch(commentActions.loadPostList(code, sort, 1, pageSize));
        }
    }

    render() {
        console.log('render post list');
        const {isLoading}=this.state;
        const { articleNewListData, page, articleNewListPageIdx } = this.props;
        if (page !== Pages.POST) {
            return <React.Fragment />
        }

        if (articleNewListData == null) {
            return <InfoDiv>
                {'正在加载数据...'}
                <div style={{ color: 'blue' }} onClick={this.directToCommentPage}>{'点击返回'}</div>
            </InfoDiv>
        }
        const { rc, me, re, count } = articleNewListData;
        return <Div>
            <ListHeaderDiv>
                <div style={{ fontWeight: 'bold' }}> {`贴子数 ${count}`}</div>
                <PostIdInput ref={el => this.codeInput = el} onKeyPress={this.inputKeyPress} placeholder="请输入code"></PostIdInput>
                {/* <div onClick={this.sortList} style={{ color: '#4169E1', cursor: 'pointer' }}>{this.state.sort === -1 ? '排序-倒序' : '排序-正序'}</div> */}
                <div />
            </ListHeaderDiv>
            {rc === 0 && <InfoDiv> {`加载贴子列表失败：${me}`} </InfoDiv>}
            {isLoading===false && rc === 1 && this.renderList({ re })}
            {isLoading===true && <InfoDiv> {'正在加载中，请稍候...'} </InfoDiv>}
            { count > 0 && <PageNavigator style={{ width: 200 }} pageSize={this.state.pageSize} pageIdx={articleNewListPageIdx} pageCount={this.state.pageCount} onNavigate={this.handleNavigatePage} />}
        </Div>
    }
}

function mapStateToProps(state) {
    const { page, articleNewListData, articleNewListPageIdx } = state.comment;
    return { page, articleNewListData, articleNewListPageIdx };
}


const articleNewList = connect(mapStateToProps)(ArticleNewList)

export { articleNewList as ArticleNewList }