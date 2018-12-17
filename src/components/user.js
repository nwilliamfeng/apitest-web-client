import React from 'react'
import { Linker, Span ,ColumnFlexDiv} from './parts'
import styled from 'styled-components'
import {Colors} from './Colors'
const vimg =require('../assets/imgs/v.png')

const StickTag = () => <Span color={'white'} background={'gray'} padding={'3px 5px 1px 5px'} fontSize={'10px'} margin={'0px 3px'}>{'置顶'}</Span>

const AuthorTag = () => <Span color={'white'} background={Colors.LINK_COLOR} padding={'3px 5px 1px 5px'} fontSize={'10px'} margin={'0px 3px'}>{'作者'}</Span>

const VDiv=styled.div`
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

const VImg=styled.img`
    width:12px;
    height:12px;

`

export const WithVTag=WrapperUser=>props=>{
    const {isVUser} =props;
    return <ColumnFlexDiv style={{justifyContent:'flex-start',alignItems:'center'}}>
        <WrapperUser {...props} />
        {isVUser===true && <VImg src={vimg}/>}
    </ColumnFlexDiv>
}

export const User = ({ nickName,fontSize,color }) => {
    return <Linker href='' fontSize={fontSize} color={color}>{nickName}</Linker>
}

/**
 * 在昵称后面打上置顶标记
 * @param {*} WrapperUser 
 */
export const withStickTag = WrapperUser => props => {
    const {isStick}=props;
   return <span>
        <WrapperUser {...props} />
        {isStick===true && <StickTag />}
    </span>
}

/**
 * 在昵称后面打上作者标记
 * @param {*} WrapperUser 
 */
export const withAuthorTag = WrapperUser => props => {
    const {isAuthor}=props;
   return <span>
        <WrapperUser {...props} />
        {isAuthor===true && <AuthorTag />}
    </span>
}

/**
 * 冒号
 * @param {*} WrapperUser 
 */
export const withColonTag= WrapperUser => props => {
   return <Span>
        <WrapperUser {...props} />
        <Span color={'gray'}>{'：'}</Span>
    </Span>
}

export const withUserInfo = WrapperUser => props => {
    const {influenceLevel,registDuration}=props;
   return <div>
     
       <WrapperUser {...props} />
       
       
        <ColumnFlexDiv style={{ color: 'gray', fontSize: '9px' }}>
            {`影响力: ${influenceLevel}，注册时长: ${registDuration}`}

        </ColumnFlexDiv>
    </div>
}
