import React, { Component } from 'react'
import SplitPane from 'react-flex-split-pane'
import PropTypes from 'prop-types'



export const withSplit = (isHorizontal=false) => class extends Component {

    static propTypes = {
       
        size: PropTypes.object,
        minSize: PropTypes.number,
    }

    constructor(props) {
        super(props)
        const { size } = props
        this.state = {
            size,
            isResizing: false,
        }
    }

    onResizeStart = () => this.setState({ isResizing: true })
    onResizeEnd = () => this.setState({ isResizing: false })
    onChange = size => this.setState({ size })

    render() {
        const {children,minSize,maxSize,isDisable} =this.props
        
        return <SplitPane
            type={isHorizontal? "horizontal": "vertical"}
            size={this.state.size}
            minSize={minSize}
            maxSize={maxSize}
            isResizing={isDisable? isDisable===false : this.state.isResizing}
            onResizeStart={this.onResizeStart}
            onResizeEnd={this.onResizeEnd}
            onChange={this.onChange}

            pane1Style={isHorizontal?{borderBottom:'1px solid silver'}: { borderRight: '1px solid silver' }} >

             {children}

        </SplitPane>
    }

}