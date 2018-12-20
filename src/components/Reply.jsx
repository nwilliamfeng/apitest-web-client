import React, { Component } from 'react'
import { commentActions } from '../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ColumnFlexDiv, ClickImg, ButtonDiv, Span } from './parts'
import { NickName, withStickTag, withAuthorTag, withUserInfo, withColonTag, withFollowTag, withLikeTag, UserAvata } from './user'
import { take } from 'lodash'
import { compose } from 'recompose';
import { withShowMoreContent, withShowMoreContent2 } from './withShowMoreContent';
import { withExpand } from '../controls';

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
const UserInfoDiv = styled.div`
    width:100%;
    text-align:left;
    color:#4169E1;
    font-size:14px;    
`

const ContentDiv = styled.div`
    margin-top:8px;
    text-align:left;
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

const CommentUser = compose(withUserInfo, withStickTag, withAuthorTag)(props => <NickName {...props} />)

const ReplyUser = compose(withColonTag, withAuthorTag)(props => <NickName {...props} />)

const renderReplyUser = ({ reply_user, reply_is_author, }) => {
    const { user_nickname } = reply_user;
    return <ReplyUser nickName={user_nickname} fontSize={'14px'} isAuthor={reply_is_author} />
}

const CommentUserInfo = props => {
    const { reply_user, reply_is_author, reply_is_top } = props;
    const { user_nickname, user_influ_level, user_age, } = reply_user;
    return <UserInfoDiv {...props}>
        <CommentUser nickName={user_nickname} influenceLevel={user_influ_level} registDuration={user_age} isAuthor={reply_is_author} isStick={reply_is_top} />
    </UserInfoDiv>
}


const ChildReplyListDiv = styled.div`
    padding:5px 0px 5px 10px;
    text-align:left;
`

const ChildReplyContent = withShowMoreContent(props => {
    <Span >
    {renderReplyUser({ reply_user, reply_is_author })}
    {`${reply_text}`}
</Span>??
})

export const ChildReply = props => {
    const { reply_user, reply_text, user_id, reply_id, sourceReplyId, reply_is_author } = props;
    const showMoreContent = reply_text.length > 96;
    // const Content = withShowMoreContent(() => <Span >
    //     {renderReplyUser({ reply_user, reply_is_author })}
    //     {`${reply_text}`}
    // </Span>, showMoreContent)
    return <Content {...props} />
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

const CommentUserWithLike = withLikeTag(props => <CommentUserInfo {...props} />)

const ReplyContent = withShowMoreContent2(props => {
    const { source_reply, reply_text } = props;
    return <React.Fragment {...props}>
        {source_reply && source_reply.length > 0 && <span>{`回复${source_reply[0].source_reply_user_nickname}：`}</span>}{reply_text}
    </React.Fragment>
})

export const Reply = props => {
    const handleClick = () => {
        const { reply_id, dispatch, replyPageSize, postId } = props;
        dispatch(commentActions.loadReplyList(postId, reply_id, -1, 1, replyPageSize));
    }

    const { user_id, reply_id, reply_text, reply_time, reply_picture, child_replys, reply_count } = props;
    const showMoreContent = reply_text.length > 96;

    return <ReplyDiv>
        <UserAvata userId={user_id} />
        <ContainerDiv >
            <ColumnFlexDiv>
                <CommentUserWithLike {...props} />
            </ColumnFlexDiv>
            <ReplyContent {...props} showMoreContent={showMoreContent} />
            <img alt='' src={reply_picture} style={{ maxWidth: '100%', maxHeight: '200px', margin: 3 }} />
            <FooterDiv>
                {reply_time}
                <ReplyButton>{'回复'}</ReplyButton>
            </FooterDiv>
            {child_replys && <ChildReplys items={child_replys} sourceReplyId={reply_id} />}
            <ShowMoreDiv>
                {reply_count > 4 && <ButtonDiv title={'显示所有回复'} onClick={handleClick}>{`显示全部${reply_count}条回复>`}</ButtonDiv>}
            </ShowMoreDiv>
        </ContainerDiv>
    </ReplyDiv>
}

const CommentUserWithFollow = withFollowTag(props => <CommentUserInfo {...props} />)

const TimeInfo = withLikeTag(props => <div {...props}>{props.reply_time}</div>)

export const IdentifyComment = props => {
    const { user_id, reply_is_author, reply_is_follow, reply_like_count, reply_text, reply_user, reply_time, reply_picture, reply_is_top } = props;
    return <ReplyDiv>
        <UserAvata userId={user_id} />
        <ContainerDiv >
            <ColumnFlexDiv style={{ alignItems: 'center' }}>
                <CommentUserWithFollow {...props} />
            </ColumnFlexDiv>
            <ContentDiv>{reply_text}</ContentDiv>
            <img alt='' src={reply_picture} style={{ maxWidth: '100%', maxHeight: 200 }} />
            <FooterDiv>
                <TimeInfo {...{ reply_like_count, reply_time }} />
                <ReplyButton>{'回复'}</ReplyButton>
            </FooterDiv>
        </ContainerDiv>
    </ReplyDiv>
}
