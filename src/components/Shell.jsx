import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BackgroundImg from '../assets/imgs/background.jpg';
import { withScroll, withSplit } from '../controls'



import { Home } from './Home'


const ShellDiv = styled.div`
    display:flex;
    justify-content:center;
`

/**
 * 背景板
 */
const Background = styled.div`
        left: 0px;
        right: 0px;
        height: 100vh;
        opacity: 0.5;
        z-index:-1;
        background-attachment:fixed;
        background-image:${props => `url(${props.img})`};
        background-repeat:no-repeat;
        background-size:cover;
        display:block;
        filter: blur(5px);
        float: left;
        position: fixed;`

const Container = styled.div`
    display:flex;
    flex-direction:column;
    background: white;
    height:100vh;
    width:70%;
`

const TabDiv = styled.div`
    display:flex;
    width:100%;
    height:100%;
    -webkit-user-select: none; /* Chrome/Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
`

const MenuBarDiv = styled.div`
    text-align:left;
    width:400px;
`

const OutListDiv = styled.div`
     height:100%;
    padding:0px 1px 0px 0px; 
`

const ListContainer = withScroll(props => <div {...props} />)

const VerticalSplit = withSplit()

//---------------------------------------------------------
const CommentOutContainer = styled.div`
    display:flex;
    flex-direction:column;
    background: white;
    height:100vh;
    
    min-width:500px;
`
const CommentContainer = withScroll(props => <div style={{height:'100%',}} {...props} />)

class Shell extends Component {
    render() {
        return <ShellDiv>
            <Background img={BackgroundImg} />
       
            <CommentOutContainer>
                <CommentContainer>
                    <Home />
                </CommentContainer>
            </CommentOutContainer>

        </ShellDiv>
    }
}


const mapStateToProps = state => {
    // const state=state.shell
    return { ...state } = state;
}

const shell = connect(mapStateToProps)(Shell);

export { shell as Shell };