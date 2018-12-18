import React, { Component } from 'react'

import { commentActions } from '../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Colors } from './Colors'
import { ColumnFlexDiv, ClickImg, ButtonDiv, Span } from './parts'
import { User, withStickTag, withAuthorTag, withUserInfo, withColonTag } from './user'
import { take } from 'lodash'
import { compose } from 'recompose';

const likeImgSrc = require('../assets/imgs/like.png')

const ContainerDiv = styled.div`
     
    width:100%;
    padding-left:10px;
    
`

const ReplyDiv = styled.div`
    display:flex;
    background:white;
    width:100%;
    padding:10px 5px;
    border-top:1px solid #DCDCDC;
`
const UserAvataImg = styled.img`
    width:32px;
    height:32px;
    border-radius:62px;
`


const UserInfoDiv = styled.div`
    width:100%;
    text-align:left;
    color:#4169E1;
    font-size:14px;
     
`

const LikeDiv = styled.div`
    display:flex;
    color:gray;
`

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

const ReplyButton = styled.div`
    padding:0px 6px;
    border:lightgray solid 1px;
    border-radius:12px;
`

const FooterDiv = styled(ColumnFlexDiv)`
    color:lightgray;
    font-size:8px;
    padding-top:5px;
    justify-content: space-between;
    align-items:center;
`

const CommentUser = compose(withUserInfo, withStickTag, withAuthorTag)(props => <User {...props} />)

const ReplyUser = compose(withColonTag, withAuthorTag)(props => <User {...props} />)

const renderReplyUser = ({ reply_user, reply_is_author, }) => {
    const { user_nickname } = reply_user;
    return <ReplyUser nickName={user_nickname} fontSize={'14px'} isAuthor={reply_is_author} />
}

const renderCommentUser = ({ reply_user, reply_is_author, reply_is_top }) => {
    const { user_nickname, user_influ_level, user_age, } = reply_user;
    return <CommentUser nickName={user_nickname} influenceLevel={user_influ_level} registDuration={user_age} isAuthor={reply_is_author} isStick={reply_is_top} />
}


const ChildReplyListDiv = styled.div`
    padding:5px 0px 5px 10px;
    text-align:left;
`


export class ChildReply extends Component {
    constructor(props) {
        super(props);
        this.state = { needContentExpand: false };
    }

    handleShowExpand = () => {
        this.setState({ needContentExpand: true });
    }

    render() {
        const { reply_user, reply_text, user_id, reply_id, sourceReplyId, reply_is_author } = this.props;
        const showMoreContent = reply_text.length > 96;
        const { needContentExpand } = this.state;
        return <div>
            {needContentExpand === true && <ExpandContentDiv>
                <span>
                    {renderReplyUser({ reply_user, reply_is_author })}
                    {`${reply_text}`}
                </span>

                {/* <span style={{ color: Colors.LINK_COLOR }}>{reply_user.user_nickname}</span>{reply_is_author === true && <span style={{ background: '#4169E1', padding: '1px 3px', color: 'white', fontSize: 10, marginLeft: 5 }}>{'作者'}</span>}{`：  ${reply_text}`} */}
            </ExpandContentDiv>}
            {needContentExpand === false && <ContentDiv>
                <Span >
                    {renderReplyUser({ reply_user, reply_is_author })}
                    {`${reply_text}`}
                </Span>
                {/* <span style={{ color: Colors.LINK_COLOR }}>{reply_user.user_nickname}</span>{reply_is_author === true && <span style={{ background: '#4169E1', padding: '1px 3px', color: 'white', fontSize: 10, marginLeft: 5 }}>{'作者'}</span>}{`：  ${reply_text}`} */}
            </ContentDiv>}
            <ShowMoreTextDiv>
                {showMoreContent === true && needContentExpand === false && <ButtonDiv style={{ justifySelf: 'flex-end' }} onClick={this.handleShowExpand}>{'展开'}</ButtonDiv>}
            </ShowMoreTextDiv>

        </div>
    }
}


const ChildReplys = ({ items, sourceReplyId }) => {
    let crs = items;
    if (items.length > 4) {
        crs = take(items, 4);
    }
    return <ChildReplyListDiv>
        {crs.map(x => <ChildReply key={x.reply_id} {...x} sourceReplyId={sourceReplyId} />)}
    </ChildReplyListDiv>
}



const ShowMoreDiv = styled(ColumnFlexDiv)`
    justify-self: flex-start;
    align-items:flex-start;
    justify-content:flex-start;
    margin-left:10px;
`

const ShowMoreTextDiv = styled(ColumnFlexDiv)`
    justify-self: flex-start;
    align-items:flex-start;
    justify-content:flex-end;
  
`

const UnfollowDiv = styled.div`
    border:1px solid #039; 
    cursor:pointer;
    opacity:0.8;
    &:hover{
        opacity:1;
    }
    color:#039;
    font-size:8px;
    padding:1px 3px;
    width:45px; 
    border-radius:3px;
    max-height:22px;
`
const FollowDiv = styled.div`
    background:#039;
    color:white;
    cursor:pointer;
    padding:2px 3px;
    opacity:0.8;
    font-size:10px;
    white-space:nowrap;
    &:hover{
        opacity:1;
    }
    border-radius:3px;
    max-height:22px;
    width:52px;
   
`


export class Reply extends Component {

    constructor(props) {
        super(props);
        this.state = { needContentExpand: false };
    }

    handleClick = () => {
        const { user_id, reply_is_top, reply_id, reply_is_author, reply_like_count, reply_text, reply_user, reply_time, reply_picture, child_replys, reply_count, source_reply, dispatch, replyPageSize, postId } = this.props;

        dispatch(commentActions.loadReplyList(postId, reply_id, -1, 1, replyPageSize));
    }

    handleShowExpand = () => {
        this.setState({ needContentExpand: true });
    }

    render() {
        const { user_id, reply_is_top, reply_id, reply_is_author, reply_is_follow, reply_like_count, reply_text, reply_user, reply_time, reply_picture, child_replys, reply_count, source_reply, dispatch, replyPageSize, postId } = this.props;
        const showMoreContent = reply_text.length > 96;
        const { needContentExpand } = this.state;

        return <ReplyDiv>
            <UserAvataImg alt='' src={`https://avator.eastmoney.com/qface/${user_id}/120`} />
            <ContainerDiv >
                <ColumnFlexDiv>
                    <UserInfoDiv>
                        {renderCommentUser({ reply_user, reply_is_author, reply_is_top })}
                    </UserInfoDiv>

                    <LikeDiv>
                        <ClickImg src={likeImgSrc}/>
                        {reply_like_count}
                    </LikeDiv>
                </ColumnFlexDiv>
                <div>
                    {needContentExpand === true && <ExpandContentDiv>
                        {source_reply && source_reply.length > 0 && <span>{`回复${source_reply[0].source_reply_user_nickname}：`}</span>}{reply_text}
                    </ExpandContentDiv>}
                    {needContentExpand === false && <ContentDiv>
                        {source_reply && source_reply.length > 0 && <span>{`回复${source_reply[0].source_reply_user_nickname}：`}</span>}{reply_text}
                    </ContentDiv>}
                    <ShowMoreTextDiv>
                        {showMoreContent === true && needContentExpand === false && <ButtonDiv style={{ justifySelf: 'flex-end' }} onClick={this.handleShowExpand}>{'展开'}</ButtonDiv>}
                    </ShowMoreTextDiv>

                </div>

                <img alt='' src={reply_picture} style={{ maxWidth: '100%', maxHeight: '200px', margin: 3 }} />
                <FooterDiv>
                    {reply_time}
                    <ReplyButton>{'回复'}</ReplyButton>
                    {'...'}
                </FooterDiv>
                {child_replys && <ChildReplys items={child_replys} sourceReplyId={reply_id} />}
                <ShowMoreDiv>
                    {reply_count > 4 && <ButtonDiv title={'显示所有回复'} onClick={this.handleClick}>{`显示全部${reply_count}条回复>`}</ButtonDiv>}
                </ShowMoreDiv>

            </ContainerDiv>

        </ReplyDiv>
    }
}



export const Comment = props => {
    const { user_id, reply_is_author, reply_is_follow, reply_like_count, reply_text, reply_user, reply_time, reply_picture, reply_is_top } = props;
    
    return <ReplyDiv>
        <UserAvataImg alt='' src={`https://avator.eastmoney.com/qface/${user_id}/120`} />
        <ContainerDiv >
            <ColumnFlexDiv style={{ alignItems: 'center' }}>
                <UserInfoDiv>
                    {renderCommentUser({ reply_user, reply_is_author, reply_is_top })}
                </UserInfoDiv>

                {reply_is_follow === true && <FollowDiv>{'已关注'}</FollowDiv>}
                {reply_is_follow === false && <UnfollowDiv >{'关注'}</UnfollowDiv>}
            </ColumnFlexDiv>
            <ContentDiv>
                {reply_text}
            </ContentDiv>
            <img alt='' src={reply_picture} style={{ maxWidth: '100%', maxHeight: 200 }} />
            <FooterDiv>
                {reply_time}
                <LikeDiv>
                    <ClickImg src={likeImgSrc} />
                    {reply_like_count}
                </LikeDiv>
                <ReplyButton>{'回复'}</ReplyButton>

            </FooterDiv>


        </ContainerDiv>

    </ReplyDiv>
}

export const PageNavigator = ({ pageCount, onPreviousClick, onNextClick }) => {
    return <ColumnFlexDiv style={{ justifyContent: 'center', width: '100%', alignItems: 'center', padding: 10, background: '#F5F5F5' }}>
        {`共 ${pageCount} 页`}
        
        <div onClick={onPreviousClick} style={{ color: '#4169E1', cursor: 'pointer' }}>{'上一页'}</div>
        <div onClick={onNextClick} style={{ marginLeft: 10, color: '#4169E1', cursor: 'pointer' }}>{'下一页'}</div>
    </ColumnFlexDiv>
}