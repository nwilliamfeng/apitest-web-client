import React, { Component } from 'react'

export class Input extends Component {

    constructor(props){
        super(props);
        this.state={value:props.value};
        
    }
    
    keyHandle = e => {
        if (e.nativeEvent.keyCode === 13) {
            const { onSubmit } = this.props;
            e.preventDefault();
            if (onSubmit != null) {
                onSubmit(this.input.value);
            }
        }
    }

    componentWillReceiveProps(nextProps,nextContext){
        if(nextProps!=null){
            if(this.state.value!==nextProps.value){
                this.setState({value:nextProps.value})
            }
        }
    }

    handleChange(e){
        this.setState({value: e.target.value });
    }

    render() {
        const {  inputStyle, placeholder } = this.props;
        return <input ref={el => this.input = el} value={this.state.value}  onChange={this.handleChange} onKeyPress={this.keyHandle} style={inputStyle} placeholder={placeholder} />
    }
}