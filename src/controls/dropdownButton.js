import React, { Component } from 'react'
import styled from 'styled-components'
import Popup from "reactjs-popup"
import PropTypes from 'prop-types'

const Menu = styled.div`
    width: 150px;   
    display: flex;
    flex-direction: column;
    background: #2A2A2A;
    color: gray;
`;

const MenuItemDiv = styled.div`  
    cursor: pointer;
    padding-left: 25px;
    padding-top: 10px;
    padding-bottom: 10px;    
    &:hover {   
        background: #2F3134;
    }
`;


const popupContentStyle = (hOffset, vOffset) => {
    return {
        padding: "0px",
        border: "none",
        width: 150,
        backgroundColor: 'transparent',
        marginTop: vOffset ? vOffset : 0,
        marginLeft: hOffset ? hOffset : 0,
    }
}

/**
 * 菜单项
 * @param {*} param0 
 */
const MenuItem = ({ onClick, title, afterClick }) => {
    const handleClick = () => {
        if (onClick != null) {
            onClick()
        }
        if (afterClick != null) {
            afterClick()
        }
    }
    return <MenuItemDiv onClick={handleClick}>{title}</MenuItemDiv>
}

/**
 * 支持下拉框按钮
 * @param {*} Button 
*/
export const dropdownButton = Button => class extends Component {
    static propTypes = {
        menuItems: PropTypes.array.isRequired, //要显示的菜单项集合
        popOnTop: PropTypes.bool, //是否在顶部弹出
        popOnLeft:PropTypes.bool,
        hOffset: PropTypes.number, //菜单项弹出的水平偏移量
        vOffset: PropTypes.number, //菜单项弹出的垂直偏移量
    }

    afterItemClick = () => this.popup.closePopup()
    render() {
        const { hOffset, vOffset, popOnTop, menuItems,popOnLeft } = this.props
        return <Popup
            trigger={() => (<Button {...this.props} />)}
            position={popOnTop === true ? `${popOnLeft===true?'left':'right'} bottom` : `${popOnLeft===true?'left':'right'} top`}
            ref={el => this.popup = el}
            closeOnDocumentClick
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={popupContentStyle(hOffset, vOffset)}
            arrow={false} >
            {menuItems && <Menu>
                {menuItems.map(x => <MenuItem {...x} afterClick={this.afterItemClick} key={x.title}/>)}
            </Menu>}
        </Popup>
    }
}


