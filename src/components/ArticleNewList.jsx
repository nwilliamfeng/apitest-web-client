import React, { Component } from 'react'

import { commentActions } from '../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColumnFlexDiv, ClickImg, Img, PostIdInput } from './parts'

import { isEqual } from 'lodash'
import { Reply, Comment, PageNavigator } from './Reply'
import { withScroll } from '../controls'
import { Pages } from '../constants';
import {User,WithVTag} from './user'




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

const PostUser=WithVTag(props=><User {...props}/>)

class ArticleNewList extends Component {

    constructor(props) {
        console.log('create postList');
        super(props);
        this.state = { sort: -1, pageIdx: 0, pageCount: 0, pageSize:20, code: null, };
    }


    componentWillReceiveProps(nextProps, nextContext) {

        const { pageCount, pageIdx, pageSize } = this.state;
        if (nextProps != null && pageCount === 0) {
            const { articleNewListData } = nextProps;
            this.setState({ pageCount: Math.ceil(articleNewListData.count / pageSize) });
        }

    }

    dateFormat = (fmt, dateStr) => {
        const date = new Date(dateStr)
        let o = {
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }



    loadNextPage = () => {
        const { pageIdx, pageCount, pageSize, code, sort } = this.state;
        if (pageIdx >= pageCount) {
            alert('已经是最后一页了');
            return;
        }
        this.setState({ pageIdx: pageIdx + 1 });
        this.props.dispatch(commentActions.loadPostList(code, sort, pageIdx + 1, pageSize));
    }

    loadPreviousPage = () => {
        const { pageIdx, pageCount, pageSize, code, sort } = this.state;
        if (pageIdx === 1) {
            alert('已经是第一页了');
            return;
        }
        this.setState({ pageIdx: pageIdx - 1 });
        this.props.dispatch(commentActions.loadPostList(code, sort, pageIdx - 1, pageSize));
    }

    sortList = () => {
        const { pageIdx, code, pageSize, sort } = this.state;
        const nwSortType = sort === -1 ? 1 : -1;
        this.setState({ sort: nwSortType });
        this.props.dispatch(commentActions.loadPostList(code, nwSortType, pageIdx, pageSize));
    }

    renderListItem = item => {

        const { post_comment_count, post_click_count, post_content, post_id, post_last_time, post_publish_time, post_title, post_user } = item;
        const { user_nickname, user_v } = post_user;
        
        return <Tr key={post_id}>
            <Td width={'100px'} fontSize={'12px'} >{post_click_count}</Td>
            <Td width={'100px'} fontSize={'12px'} >{post_comment_count}</Td>
            <Td width={'300px'} title={post_title}><a href=''>{post_title}</a></Td>
            <Td width={'100px'}> <PostUser nickName={user_nickname} isVUser={user_v>0}/> </Td>
            <Td width={'120px'}>{this.dateFormat('MM-dd', post_publish_time)}</Td>
            <Td width={'140px'}>{this.dateFormat('MM-dd hh:mm', post_last_time)}</Td>
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
                        <th>阅读</th>
                        <th>评论</th>
                        <th style={{textAlign:'center'}}>标题</th>
                        <th>作者</th>
                        <th>发表日期</th>
                        <th>最后更新日期</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        re.map(x => this.renderListItem(x))
                    }

                </tbody>

            </Table>
        </ListContainer>


    }

    inputKeyPress = e => {
        if (e.nativeEvent.keyCode === 13) { //e.nativeEvent获取原生的事件对像

            const code = this.codeInput.value;
            this.setState({ pageCount: 0, pageIdx: 1, code });
            const { sort, pageSize } = this.state;
            const {dispatch} =this.props;
            dispatch(commentActions.loadPostList(code, sort, 1, pageSize));
        }
    }



    render() {
        console.log('render post list');
        const { articleNewListData, page } = this.props;

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
                <div style={{ fontWeight: 'bold' }}> {`贴子${count}`}</div>
                <PostIdInput ref={el => this.codeInput = el} onKeyPress={this.inputKeyPress} placeholder="请输入code"></PostIdInput>
                {/* <div onClick={this.sortList} style={{ color: '#4169E1', cursor: 'pointer' }}>{this.state.sort === -1 ? '排序-倒序' : '排序-正序'}</div> */}
                <div/>
            </ListHeaderDiv>
            {rc === 0 && <InfoDiv> {`加载贴子列表失败：${me}`} </InfoDiv>}
            {rc === 1 && this.renderList({ re })}
            {count > 0 && <PageNavigator pageCount={this.state.pageCount} onPreviousClick={this.loadPreviousPage} onNextClick={this.loadNextPage} />}
        </Div>
    }
}

function mapStateToProps(state) {
    const { page, articleNewListData } = state.comment;
    return { page, articleNewListData };
}


const articleNewList = connect(mapStateToProps)(ArticleNewList)

export { articleNewList as ArticleNewList }