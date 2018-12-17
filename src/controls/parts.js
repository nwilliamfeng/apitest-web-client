
import styled from 'styled-components'
import React from 'react'

export const LiIcon = styled.img`
    max-width:16px;
    max-height:16px;
    margin:1px 5px 1px 0px;
`

export const Ul = styled.ul`
    list-style: none;
  
    width:100%;`

export const Li = styled.li`
    outline:none;
    text-align:left;
    margin-left:-40px;
`

export const NameDiv = styled.div`
    overflow:hidden;
    text-overflow:ellipsis;
    margin-right:10px;
    margin-left:3px;
    white-space:nowrap;
    text-align:left;
`

export const FlexDiv = styled.div`
    display:flex;
    overflow:hidden;
    width:100%;
    text-overflow:ellipsis;
    white-space:nowrap;
    cursor:default;
    justify-content:space-between;
    align-items: center;
    -webkit-user-select: none; /* Chrome/Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
`

export const HoverDiv = styled.div`
    &:hover{
        background-color: #DEDBDA;
        color:black;
    };

`

export const FlexContainerDiv = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    height:32px;
`

const Img = styled.img`
    width:12px;
    height:12px;
`

export const LoadingImg = props => <Img {...props} alt='' src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==' />