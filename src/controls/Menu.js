import React, { Component } from 'react'
import styled from 'styled-components'
import Popup from "reactjs-popup"

const MenubarDiv = styled.div`
    display:flex;

`

const MenuItemDiv = styled.div`
    padding:2px 12px;
    background:${props => props.isOpen === true ? '#eee' : 'white'};
    border:${props => props.isTopMenu === true && props.isOpen === true ? '1px solid lightgray' : '1px solid transparent'};
    border-bottom:none;
    max-width:${props => props.isTopMenu === true ? '120px' : 'none'};
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    cursor:default;
    &:hover{
        background:#eee;
    }
    -webkit-user-select: none; /* Chrome/Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
`

const SpliterDiv = styled.div`
    display:flex;
    justify-content:center;
    padding:2px 6px;
    background:white;
    cursor:default;
`

const SpliterLine = styled.div`
    
    height:2px;
    flex:0 1 100%;
    border-top:1px solid lightgray;
`

const Spliter = props => <SpliterDiv {...props}>
    <SpliterLine />
</SpliterDiv>


const popupContentStyle = () => {
    return {
        padding: "0px",
        border: "1px solid lightgray",
        minWidth: 150,
        backgroundColor: 'white',

    }
}


class MenuItem extends Component {

    handleClick = () => {
        const { command, popup,dispatch } = this.props;
        if (command != null) {
            command(dispatch);
            popup.closePopup();
        }
    }

    isSpliter = () => {
        const { title } = this.props;
        return title == null || title === '';
    }

    render() {

        const { title, subItems, isTopMenu,dispatch } = this.props;
        return <React.Fragment>
            {subItems && <Popup
                trigger={open => <MenuItemDiv isOpen={open} isTopMenu={isTopMenu}>{title}</MenuItemDiv>}
                position={'bottom left'}
                closeOnDocumentClick
                mouseLeaveDelay={300}
                on='hover'
                ref={el => this.popup = el}
                mouseEnterDelay={0}
                contentStyle={popupContentStyle(0, 0)}
                arrow={false} >
                <React.Fragment>
                    {subItems && subItems.map(x => <MenuItem {...x} key={x.id} popup={this.popup} dispatch={dispatch}/>)}
                </React.Fragment>

            </Popup>}
            {!subItems && !this.isSpliter() && <MenuItemDiv onClick={this.handleClick} isTopMenu={isTopMenu}>{title}</MenuItemDiv>}
            {!subItems && this.isSpliter() && <Spliter />}
        </React.Fragment>

    }
}


export class Menu extends Component {
    render() {
        console.log('render menu');
        const { items,dispatch } = this.props;
        return <MenubarDiv>
            {items && items.map(x => <MenuItem key={x.id} {...x}  dispatch={dispatch}/>)}
        </MenubarDiv>
    }
}
