import React, { Component } from 'react'
import PropTypes from 'prop-types'
 

import styled from 'styled-components'
import ReactAutocomplete from 'react-autocomplete'
require('../assets/styles/bootstrap-searchbox.css')
require('../assets/styles/scrollbar.css')

const SearchIcon = styled.i`
    color: gray;
    margin-top: -5px;`

/**
 * 菜单样式
 */
const menuStyle = {
    zIndex: 300, //这里必须把zIndex置为大的值
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'white',
    padding: '2px 0',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '50%',
}

const DefaultSearchInput = props => <div className="right-inner-addon" >
    {/* <SearchIcon aria-hidden="true"><FontAwesomeIcon icon={faSearch} /></SearchIcon> */}
    <input type="search" className="form-control input-xs" placeholder="键值"  style={props.searchBoxStyle}   />
</div>

const DefaultMenuItem = (item, highlighted) => <MenuItemDiv key={item.id} highlighted={highlighted}>
    {item.label}
</MenuItemDiv>

 

const MenuItemDiv = styled.div`
 background-color:${props => props.highlighted ? '#eee' : 'transparent'};
 padding:5px;`
 

export const withSearchBox = (Input, MenuItem) => class extends Component {

    static propTypes = {
        getMenuItems: PropTypes.func.isRequired,
        onSelectItem: PropTypes.func,
        searchByReturn: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isOpen: false,
            isReturnPressed: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { searchByReturn } = this.props
        if (searchByReturn !== true)
            return true
        return this.state.value !== nextState.value || nextState.isReturnPressed === true || this.state.isOpen !== nextState.isOpen
    }

    handleChange = e => {
        this.setState({ value: e.target.value, isOpen: true })
    }

    handleSelect = (value, item) => {
        this.setState({ value, isOpen: false })
        const { onSelectItem } = this.props
        if (onSelectItem != null)
            onSelectItem(item)
    }

    renderMenu =(items, value, style) =>{
        return <div className='scollContainer'  style={{ ...style, ...menuStyle }} children={items}/>
      }

    handleKeyDown = (e) => {
        const { searchByReturn } = this.props
        if (searchByReturn !== true || e.key === 'ArrowDown' || e.key === 'ArrowUp')
            return
        const old = this.state.isReturnPressed
        this.setState({ isReturnPressed: old === true ? false : e.key === 'Enter' })

    }

    handleItems = () => {
        const { searchByReturn, getMenuItems } = this.props
        if (searchByReturn !== true) {
            return getMenuItems()
        }
        else {
            const { isReturnPressed } = this.state
            return isReturnPressed === true ? getMenuItems() : []
        }
    }

    shouldItemRender = (item, value) => {
        return item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
    }

    onBlur = () => {
        this.setState({ isOpen: false })
    }


    render() {
        const menuItems = this.handleItems();
        return <ReactAutocomplete
            open={menuItems.length > 0 && this.state.isOpen === true}
            items={menuItems}
            shouldItemRender={this.shouldItemRender}
            getItemValue={item => item.label}
            renderItem={MenuItem ? MenuItem : DefaultMenuItem}
            renderInput={Input ? Input : props=><DefaultSearchInput {...this.props}/>}
            
            renderMenu={this.renderMenu}
            value={this.state.value}
            inputProps={{ onKeyDown: this.handleKeyDown, onBlur: this.onBlur }}
            onChange={this.handleChange}
            onSelect={this.handleSelect} />
    }

}

