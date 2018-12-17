import React, { Component } from 'react'
import styled from 'styled-components'
import {IconList} from '../controls'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 

export const FolderIcon=({width=16,height=16,viewBox='0 0 1024 1024',fill='#1296db'})=>
   <svg viewBox={viewBox} fill={fill}  width={width} height={height}><path d="M829.466422 255.903298l-253.800403 0 0-61.918211c0-36.452213-29.551036-66.00325-66.00325-66.00325L193.945177 127.981836c-36.452213 0-66.00325 29.551036-66.00325 66.00325l0 127.921461 0 59.875692 0 447.724091c0 36.452213 29.551036 66.00325 66.00325 66.00325l635.521245 0c36.452213 0 66.00325-29.551036 66.00325-66.00325L895.469672 321.906547C895.469672 285.453311 865.918635 255.903298 829.466422 255.903298zM831.508941 798.291398c0 18.367323-14.890128 33.257451-33.257451 33.257451l-319.803653 0L225.160109 831.54885c-18.367323 0-33.257451-14.890128-33.257451-33.257451L191.902658 353.120456 191.902658 225.200018c0-18.367323 14.890128-33.257451 33.257451-33.257451l253.287727 0c18.367323 0 33.257451 14.890128 33.257451 33.257451l0 94.66401 286.546202 0c18.367323 0 33.257451 14.890128 33.257451 33.257451L831.508941 798.291398z"></path><path d="M191.902658 383.823736l639.606283 0 0 63.960731-639.606283 0 0-63.960731Z" ></path></svg>

const CloseIconDiv = styled.div`
    color: gray;
    &:hover{
      color:red;
    }
    margin-left:5px;
`

const TabPaneDiv = styled.div`
    cursor:pointer;     
    border:${props => props.isSelected === true ? '1px solid  #d3cfcf' : '1px solid transparent'};   
    border-radius:${props => props.isSelected === true ? '0px 18px 0px 0px' : '0px'};
    border-top:none;
    border-bottom:${props => props.isSelected === true ? '1px solid transparent' : '1px solid #d3cfcf'}; 
    margin-left:${props => props.isSelected === true ? '-2px' : '0px'};
    z-index:${props => props.isSelected === true ? '100' : '0'};
    padding:4px 10px;
    width:130px;
    max-width:130px;
    padding-right:0px;
    &:first-child {
        margin-left:0px;
        border-left:none;
    }
    &:hover{
      background:${props => props.isSelected === true ? 'white' : 'whitesmoke'};
    }
    background:${props => props.isSelected === true ? 'white' : 'transparent'};
    margin-bottom:-1px;
`

const TitleDiv = styled.div`
    max-width:75px;
    width:75px;
    overflow:hidden;
    text-align:left;
    text-overflow:ellipsis;
    white-space:nowrap;
`
const TitleContainer = styled.div`
    display:flex;
    justify-content:center;
`

const InnerTabPaneDiv = styled.div`
    border-right:${props => props.isSelected === true ? '1px solid  transparent' : '1px solid lightgray'};
    display:flex;
    flex-wrap:nowrap;
    align-items:center;
    padding-right:7px;
    justify-content:space-between;
`

const IconDiv=styled.div`
    margin-right:3px;
    margin-top:2px;
`

const Icon = ({ iconId }) => {
    const Img = IconList.find(x => x.key === iconId).icon;
    return <IconDiv><Img /></IconDiv>
}


const TabPane = ({ tabId, iconId, title, onSelect, onClose, isSelected }) => {
    const selectClick = () => {
        onSelect(tabId);
    }
    const closeClick = (e) => {
        e.stopPropagation();
        onClose(tabId);
    }

    return <TabPaneDiv onClick={selectClick} isSelected={isSelected}>
        <InnerTabPaneDiv isSelected={isSelected}>
            <TitleContainer>
                <Icon iconId={iconId}/>
                <TitleDiv title={title}>{title}</TitleDiv>
            </TitleContainer>
            <CloseIconDiv onClick={closeClick} title='关闭'>
               
            </CloseIconDiv>
        </InnerTabPaneDiv>

    </TabPaneDiv>
}


const TabPaneListDiv = styled.div`
    display:flex;
    width:100%;
    border-bottom:${props=>props.hasTabs===true?'1px solid #d3cfcf':'none'} ;
    flex-wrap:wrap;
    background:#eee;
`

export class TabPanes extends Component {

    constructor(props) {
        super(props);       
        
        this.state = { selectedTabId:props.selectedTabId };      
    }

    componentWillReceiveProps(nextProps,nextContext){
        if(nextProps!=null)
        this.setState({selectedTabId:nextProps.selectedTabId});
       
    }

    handleSelectTab = tabId => {
        this.setState({ selectedTabId: tabId });
        const {onSelect} = this.props;
        if(onSelect){
            onSelect(tabId);
        }
    }

    handleCloseTab = tabId => {
        const {onClose} = this.props;
        if(onClose){
            onClose(tabId);
        }
    }

    render() {
        console.log('render tabpanes');
        const { selectedTabId } = this.state;
       
        const { items } = this.props;
        return <TabPaneListDiv hasTabs={items.length>0}>
            {items && items.map(x => 
            <TabPane {...x} 
                 key={x.tabId}
                 isSelected={selectedTabId===x.tabId}
                 onSelect={this.handleSelectTab}
                 onClose={this.handleCloseTab}
                 />)}
        </TabPaneListDiv>


    }
}


