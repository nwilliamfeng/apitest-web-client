import React from 'react'
import styled from 'styled-components'
import { ColumnFlexDiv, Span } from './parts'
import { NickName, withStickTag, withAuthorTag, withUserInfo, withColonTag, withFollowTag, withLikeTag, UserAvata } from './user'
import { compose } from 'recompose';
import { withShowMoreContent } from './withShowMoreContent';

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
    font-size:10px;
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


const ChildReplyContent = withShowMoreContent(props => {
    const { reply_user, reply_is_author, reply_text } = props;
    return <Span {...props}>
        {renderReplyUser({ reply_user, reply_is_author })}
        {`${reply_text}`}
    </Span>
})

export const ChildReply = props => {
    const { reply_text, } = props;
    return <ChildReplyContent {...props} showMoreContent={reply_text.length > 96} />
}



const CommentUserWithFollow = withFollowTag(props => <CommentUserInfo {...props} />)

const TimeInfo = withLikeTag(props => <div {...props}>{props.reply_time}</div>)

export const IdentifyComment = props => {
    const { user_id, reply_like_count, reply_text, reply_time, reply_picture } = props;
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
