import React from 'react'
import { Linker, Span, ColumnFlexDiv,ClickImg } from './parts'
import styled from 'styled-components'
import { Colors } from './Colors'
const vimg = require('../assets/imgs/v.png')

const StickTag = () => <Span color={'white'} background={'gray'} padding={'3px 5px 1px 5px'} fontSize={'10px'} margin={'0px 3px'}>{'置顶'}</Span>

const AuthorTag = () => <Span color={'white'} background={Colors.LINK_COLOR} padding={'3px 5px 1px 5px'} fontSize={'10px'} margin={'0px 3px'}>{'作者'}</Span>

const VDiv = styled.div`
    background:orangered;
    border-radius:16px;
    padding:0px 1px 1px 1px;
    color:white;
    margin:0px 2px;
    font-size:6px;
    width:14px;
    height:14px;
    text-align:center;
`

const VImg = styled.img`
    width:12px;
    height:12px;

`

export const WithVTag = WrapperUser => props => {
    const { isVUser } = props;
    return <ColumnFlexDiv style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
        <WrapperUser {...props} />
        {isVUser === true && <VImg src={vimg} />}
    </ColumnFlexDiv>
}

/**
 * 用户昵称
 * @param {*} param0 
 */
export const NickName = ({ nickName, fontSize, color }) => {
    return <Linker href='' fontSize={fontSize} color={color}>{nickName}</Linker>
}

/**
 * 打上置顶标记
 * @param {*} WrapperUser 
 */
export const withStickTag = WrapperUser => props => {
    const { isStick } = props;
    return <span>
        <WrapperUser {...props} />
        {isStick === true && <StickTag />}
    </span>
}

/**
 * 打上作者标记
 * @param {*} WrapperUser 
 */
export const withAuthorTag = WrapperUser => props => {
    const { isAuthor } = props;
    return <span>
        <WrapperUser {...props} />
        {isAuthor === true && <AuthorTag />}
    </span>
}

/**
 * 冒号
 * @param {*} WrapperUser 
 */
export const withColonTag = WrapperUser => props => {
    return <Span>
        <WrapperUser {...props} />
        <Span color={'gray'}>{'：'}</Span>
    </Span>
}

/**
 * 用户信息(影响力、注册时长)
 * @param {*} WrapperUser 
 */
export const withUserInfo = WrapperUser => props => {
    const { influenceLevel, registDuration } = props;
    return <div>
        <WrapperUser {...props} />
        <ColumnFlexDiv style={{ color: 'gray', fontSize: '9px' }}>
            {`影响力: ${influenceLevel}，注册时长: ${registDuration}`}
        </ColumnFlexDiv>
    </div>
}


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

export const withFollowTag = WrapperUser => props => {
    const { reply_is_follow } = props;
    return <React.Fragment>
        <WrapperUser {...props} />
        {reply_is_follow === true && <FollowDiv>{'已关注'}</FollowDiv>}
        {reply_is_follow === false && <UnfollowDiv >{'关注'}</UnfollowDiv>}
    </React.Fragment>

}

const likeImgSrc = require('../assets/imgs/like.png')


const LikeDiv = styled.div`
    display:flex;
    color:gray;
    font-size:12px;
    align-items:center;
    justify-content:center;
`
/**
 * 点赞标记
 * @param {*} WrapperUser 
 */
export const withLikeTag = WrapperUser => props => {
    const {reply_like_count} =props;
    return <React.Fragment>
        <WrapperUser {...props} />
        <LikeDiv>
            <ClickImg src={likeImgSrc} width={'14px'} height={'14px'}/>
            {reply_like_count}
        </LikeDiv>
    </React.Fragment>
}


const UserAvataImg = styled.img`
    width:32px;
    height:32px;
    border-radius:62px;
`

export const UserAvata=({userId})=> <UserAvataImg alt='' src={`https://avator.eastmoney.com/qface/${userId}/120`} />
 
