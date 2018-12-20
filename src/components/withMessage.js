import React from 'react'
import styled from 'styled-components'
import { ColumnFlexDiv, Span, Div } from './parts'
import { NickName, withStickTag, withAuthorTag, withUserInfo, withColonTag, withLikeTag, UserAvata } from './user'
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



const CommentUserWithLike = withLikeTag(props => <CommentUserInfo {...props} />)

const ReplyContent = withShowMoreContent(props => {
    const { source_reply, reply_text } = props;
    return <Div {...props}>
        {source_reply && source_reply.length > 0 && <span>{`回复${source_reply[0].source_reply_user_nickname}：`}</span>}{reply_text}
    </Div>
})



export const withMessage =DetailComponent=> props => {
    const { user_id, reply_text, reply_time, reply_picture} = props;
    return <ReplyDiv>
        <UserAvata userId={user_id} />
        <ContainerDiv >
            <ColumnFlexDiv>
                <CommentUserWithLike {...props} />
            </ColumnFlexDiv>
            <ReplyContent {...props} showMoreContent={reply_text.length > 96} />
            <img alt='' src={reply_picture} style={{ maxWidth: '100%', maxHeight: '200px', margin: 3 }} />
            <FooterDiv>
                {reply_time}
                <ReplyButton>{'回复'}</ReplyButton>
            </FooterDiv>
            <DetailComponent {...props}/>
        </ContainerDiv>
    </ReplyDiv>
}



 
