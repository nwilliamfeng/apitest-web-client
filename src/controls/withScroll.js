import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { isEqual } from 'lodash'
import Rx from 'rx'


const OutContainer = styled.div`
    height: 100%;
    position:${props => props.isAbsolute === true ? 'absolute' : 'static'};
    width:100%;
    overflow-y:auto;  overflow-x:hidden;height:whatever px;

    ::-webkit-scrollbar-thumb{  
        border-radius:12px;  
        background-color:#b5b1b1;
        overflow:hidden;height:whatever px;
    } 
    ::-webkit-scrollbar{  
        width: 6px;  
        height:4px;       
    }  
`


/**
 * 支持垂直滚动
 */
export const withScroll = InnerComponent => class extends React.Component {
    static propTypes = {
        autoScrollBottom: PropTypes.bool, //是否在呈现后自动滚动到底部
        onScrollTop: PropTypes.func, //滚动到顶部的事件
        isAbsolute: PropTypes.bool,//position
    }

    constructor(props) {
        super(props)
        this.state = { topOffset: 0, isTop: false }
    }

    updateTopState = () => {
        const { autoScrollBottom, onScrollTop } = this.props
        if (autoScrollBottom === true || onScrollTop != null) {
            const { top } = ReactDOM.findDOMNode(this.scrollDiv).getBoundingClientRect()
            const scrollHeight = ReactDOM.findDOMNode(this.container).scrollHeight
            const { topOffset, isTop } = this.state
            if (top > (scrollHeight - 150)) {   //部分场景是无论怎么滚动top始终小于scrollheight，此处减去预设偏移量，修复该问题       
                if (topOffset < top && !isTop) {
                    this.setState({ isTop: true })
                }
            }
            else {
                this.setState({ isTop: false })
            }
            this.setState({ topOffset: top })
        }
    }

    handleScroll = e => {
        this.updateTopState()
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { isAbsolute } = this.props
        return isAbsolute === true ? !isEqual(this.props, nextProps) : true
    }

    componentDidMount() {
        const list = ReactDOM.findDOMNode(this.container)
        if (list != null) {
            list.addEventListener('scroll', this.handleScroll)
            this.checkIfScrollToBottom()
        }
    }

    componentWillMount() {
        this.handleWheel$ = new Rx.Subject()
        this.handleWheel$.throttle(500).subscribe(this.handleWheel)
    }

    componentWillUnmount() {
        const list = ReactDOM.findDOMNode(this.container)
        if (list != null) {
            list.removeEventListener('scroll', this.handleScroll)
            this.handleWheel$.dispose()
        }
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        this.checkIfScrollToBottom()
    }

    checkIfScrollToBottom = () => {
        const { autoScrollBottom } = this.props;
        if (autoScrollBottom !== true) {
            return
        }
        if (this.scrollDiv != null) {
            try {
                this.scrollDiv.scrollIntoView(true)
            }
            catch (error) {
                console.log(`scrollToBottom raise error: ${error}`)
            }
        }
    }

    handleWheel = e => {
        if (e.deltaY > 0) { //下滚不处理
            return
        }
        const { isTop } = this.state
        const { onScrollTop } = this.props
        if (isTop === true && onScrollTop != null) {
            onScrollTop()
        }
    }


    render() {
        const { isAbsolute } = this.props
        return <OutContainer className='scollContainer' isAbsolute={isAbsolute} ref={el => this.container = el} onWheel={e => this.handleWheel$.onNext(e)}>
            <InnerComponent {...this.props} />
            {/* 注意这里必须是react自己的dom element如果用自定义的element则在滚动时会抛出 _this.scrollDiv.scrollIntoView is not a function */}
            <div ref={el => this.scrollDiv = el} />
        </OutContainer>
    }


}
