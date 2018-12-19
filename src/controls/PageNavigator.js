import React from 'react'
import styled from 'styled-components'
import { Input } from './Input'


const ColumnFlexDiv = styled.div`
    display:flex;
    width:100%;
`
const Button = styled.button`
    outline:none;
    border:none;
    opacity:0.8;
    background:white;
    color: #039;
    &:hover{
        opacity:1;
    }
    &:active{
        background:lightgrey;
    }
    &:disabled{
        opacity:0.3;
    }
`

const ContainerDiv = styled(ColumnFlexDiv)`
    width: 100%;
    align-items: center;
    padding: 10px;
    background: '#F5F5F5';
    font-size: 12px;
    justify-content:center;
`

const InputDiv = styled(ColumnFlexDiv)`
    background:  white;
    align-items:center;
    width: 70px;

`

export const PageNavigator = ({ pageIdx = 0, pageCount = 0, onNavigate }) => {

    let pageSizeSelect;

    const handleNavigate = idx => {
        if (onNavigate != null) {
            onNavigate(idx,pageSizeSelect.value);
        }
    }


    const handlePreviousClick = () => {
        if (pageIdx > 1) {
            handleNavigate(pageIdx - 1,pageSizeSelect.value);
        }
    }

    const handleNextClick = () => {
        if (pageIdx < pageCount) {
            handleNavigate(pageIdx + 1,pageSizeSelect.value);
        }
    }
    const style = {
        width: 25,
        border: 'none',
        textAlign: 'center',
    }

  

    const handleSelect=e=>{
        handleNavigate(pageIdx,pageSizeSelect.value);
    }

    

    return <ContainerDiv>
        <InputDiv>
            <Input inputStyle={style} onNavigate={onNavigate} onSubmit={handleNavigate} value={pageIdx} />
            {`/ ${pageCount} 页`}
        </InputDiv>
        <select onChange={handleSelect} ref={el=>pageSizeSelect=el}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <Button disabled={pageIdx <= 1} onClick={handlePreviousClick} >{'上一页'}</Button>
        <Button disabled={pageIdx >= pageCount} onClick={handleNextClick} >{'下一页'}</Button>
    </ContainerDiv>
}