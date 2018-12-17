import React, { Component } from 'react'
import styled from 'styled-components'
import { CheckBox } from './CheckBox'
 
import { IconList } from './IconList'
import { ContextMenuTriggerRegists } from './ContextMenuTriggerRegists'
 

const ItemBase = styled.div`
    &:hover{
        background:${props => props.isSelected === true ? '#CCE8FF' : 'aliceblue'};
    }
    &:hover .checkBox{
       visibility: visible;
    }
    background:${props => props.isSelected === true ? '#CCE8FF' : 'transparent'};
`

const Div = styled.div`
    display:flex;
    width:100%;
    height:100%;
    padding:5px;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content:flex-start ;
`

const LargeCheckBox = styled(CheckBox)`
    margin-left:-20px;
    margin-right:10px;
`

const LargeWordDiv = styled.div`
    max-width:64px;   
    overflow:hidden;  
    word-wrap:break-word;
    text-align:left;
`

const LargeItemDiv = styled(ItemBase)`
    display:flex;
    flex-direction:column;
    max-height:85px;
    min-width:80px;
    max-width:80px;
    align-items:center;
    justify-items:center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    padding:3px 8px 8px 8px;
`

const LargeIconDiv = styled.div`
    height:32px;
    width:32px;
    margin-bottom:2px;   
`
const LargeIcon = ({ iconId }) => {
    const Img = IconList.find(x => x.key === iconId).icon;
    return <LargeIconDiv>
        <Img width={32} height={32} />
    </LargeIconDiv>
}

const LargeContainer = styled.div`
   display:flex;
   justify-content:flex-start;
`

const SmallItemDiv = styled(ItemBase)`
    display:flex;
    max-width:270px;
    width:270px;
    max-height:24px;
    padding-left:5px;
    padding-right:5px;
    align-items:center;
    height:24px; 
`

const SmallIconDiv = styled.div`
     margin:0px 5px;  
     height:16px;
     width:16px;
`

const CheckBoxDiv = styled.div`
    visibility:${props => props.isVisible === true ? 'visible' : 'hidden'};
`

const SmallIcon = ({ iconId }) => {
    const Img = IconList.find(x => x.key === iconId).icon;
    return <SmallIconDiv>
        <Img />
    </SmallIconDiv>
}

const SmallWordDiv = styled.div`
    max-width:240px;   
    overflow:hidden;  
    text-align:left;
    white-space:nowrap;
    text-overflow:ellipsis;
`



const Trigger = (props) => {
    const { contextMenuProps} = props;
    if(contextMenuProps==null){
       return <div >{props.children}</div>
    }
    const regist = ContextMenuTriggerRegists.find(x => x.key === contextMenuProps.contextMenuTriggerId);
    if (regist == null) {
        return <div >{props.children}</div>
    }
    const ItemTrigger = regist.trigger;
   
    return <ItemTrigger  {...contextMenuProps}>
       {props.children}  
    </ItemTrigger>

}


const ListViewItem = props => {
    const { id, iconId, title, onClick, onDoubleClick, isSelected = false, isSmallIcon = false, contextMenuTriggerId } = props
    const handleClick = e => {
        if (onClick != null) {
           onClick(id);
        }
    }

    const handleCheck = () => {
        if (onClick != null) {
            onClick(id, !isSelected);
        }
    }
    const handleDoubleClick = e => {
        e.stopPropagation();
        console.log('do double click');
        if (onDoubleClick != null) {
            onDoubleClick(id);
        }
    }

    return <React.Fragment>
        <Trigger {...props} >
            {isSmallIcon === false &&
                <LargeItemDiv isSelected={isSelected} title={title} onClick={handleClick} onDoubleClick={handleDoubleClick} >
                    <LargeContainer>
                        <CheckBoxDiv className='checkBox' isVisible={isSelected} >
                            <LargeCheckBox type='checkbox' isChecked={isSelected} handleCheck={handleCheck} />
                        </CheckBoxDiv>
                        <LargeIcon iconId={iconId} />
                    </LargeContainer>
                    <LargeWordDiv>{title}</LargeWordDiv>
                </LargeItemDiv>}
            {isSmallIcon === true &&
                <SmallItemDiv isSelected={isSelected} title={title} onClick={handleClick} onDoubleClick={handleDoubleClick} >
                    <CheckBoxDiv className='checkBox' isVisible={isSelected === true} >
                        <CheckBox type='checkbox' isChecked={isSelected} handleCheck={handleCheck} />
                    </CheckBoxDiv>
                    <SmallIcon iconId={iconId} />
                    <SmallWordDiv>{title}</SmallWordDiv>
                </SmallItemDiv>
            }
        </Trigger>
    </React.Fragment>

    // return <React.Fragment>
    //     <ContextMenuTrigger id={contexMenuTriggerId}>
    //         {isSmallIcon === false &&
    //             <LargeItemDiv onClick={handleClick} onDoubleClick={handleDoubleClick} isSelected={isSelected} title={title}>
    //                 <LargeContainer>
    //                     <CheckBoxDiv className='checkBox' isVisible={isSelected} >
    //                         <LargeCheckBox type='checkbox' isChecked={isSelected} handleCheck={handleCheck} />
    //                     </CheckBoxDiv>
    //                     <LargeIcon iconId={iconId} />
    //                 </LargeContainer>
    //                 <LargeWordDiv>{title}</LargeWordDiv>
    //             </LargeItemDiv>}
    //         {isSmallIcon === true &&
    //             <SmallItemDiv onClick={handleClick} onDoubleClick={handleDoubleClick} isSelected={isSelected} title={title}>
    //                 <CheckBoxDiv className='checkBox' isVisible={isSelected === true} >
    //                     <CheckBox type='checkbox' isChecked={isSelected} handleCheck={handleCheck} />
    //                 </CheckBoxDiv>
    //                 <SmallIcon iconId={iconId} />
    //                 <SmallWordDiv>{title}</SmallWordDiv>
    //             </SmallItemDiv>
    //         }
    //     </ContextMenuTrigger>
    // </React.Fragment>
}

export class ListView extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedItemIds: [] };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ selectedItemIds: [] });
    }

    handleItemClick = (id, isSelected) => {
        if (isSelected == null) {
            this.setState({ selectedItemIds: [id] });
            return;
        }
        const { selectedItemIds } = this.state;
        const idx = selectedItemIds.findIndex(x => x === id);
        if (idx >= 0) {
            if (isSelected === false) {
                this.setState({ selectedItemIds: [...selectedItemIds.slice(0, idx), ...selectedItemIds.slice(idx + 1)] });
            }
        }
        else if (isSelected === true) {
            this.setState({ selectedItemIds: [...selectedItemIds, id] })
        }
    }

    render() {
        const { items } = this.props;
        const { selectedItemIds } = this.state;
        return <Div>
            {items && items.map(x => <ListViewItem key={x.id} {...x} onClick={this.handleItemClick} isSelected={selectedItemIds.findIndex(id => id === x.id) >= 0} />)}
        </Div>
    }
}