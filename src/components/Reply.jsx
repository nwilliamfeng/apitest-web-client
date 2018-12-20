import React from 'react'
import { commentActions } from '../actions'
import styled from 'styled-components'
import { ColumnFlexDiv, ButtonDiv, Span, Div } from './parts'
import { NickName,  withAuthorTag,  withColonTag } from './user'
import { take } from 'lodash'
import { compose } from 'recompose';
import {withMessage} from './withMessage'
import { withShowMoreContent } from './withShowMoreContent';


const ReplyUser = compose(withColonTag, withAuthorTag)(props => <NickName {...props} />)

const renderReplyUser = ({ reply_user, reply_is_author, }) => {
    const { user_nickname } = reply_user;
    return <ReplyUser nickName={user_nickname} fontSize={'14px'} isAuthor={reply_is_author} />
}



const ChildReplyListDiv = styled.div`
    margin-top:3px;
    padding:3px 0px 5px 10px;
    text-align:left;
   
`

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
    font-size:12px;
`

export const Reply=withMessage(props=><Div {...props}/>)

export const Comment=withMessage(props=>{
    const handleClick = () => {
        const { reply_id, dispatch, replyPageSize, postId } = props;
        dispatch(commentActions.loadReplyList(postId, reply_id, -1, 1, replyPageSize));
    }

    const {  reply_id,  child_replys, reply_count } = props;
    return <React.Fragment>
         {child_replys && child_replys.length>0 &&<Div background={'#eeee'} padding={'0px 0px 3px 0px'} margin={'5px 0px'}>
                    <ChildReplys items={child_replys} sourceReplyId={reply_id} />
                    <ShowMoreDiv>
                        {reply_count > 4 && <ButtonDiv title={'显示所有回复'} onClick={handleClick}>{`显示全部${reply_count}条回复>`}</ButtonDiv>}
                    </ShowMoreDiv>
                </Div>}
    </React.Fragment>
})


