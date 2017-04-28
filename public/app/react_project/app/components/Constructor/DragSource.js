import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import { DragSource } from 'react-dnd'
import Tooltip from 'react-aria-tooltip'

import Icon from 'components/Icon'

import { padding, font } from 'constants/style'
import { rem } from 'utils/style'

const Root = styled.a`
    position: relative;

    display: block;
    padding-right: ${padding};
    padding-left: ${padding};
    margin-bottom: -1px;

    cursor: pointer;

    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;

    &:hover {
        background-color: #f0f0f0;

        .ra-tooltip-wrapper {
            display: block;
        }

    }

    &:first-child {
        border-top: 0;
    }

    &:last-child {
        border-bottom: 0;
    }
`

const Wrapper = styled.div`
    align-items: center;
    padding-top: 20px;
    padding-bottom: 15px;
    padding-right: ${rem(20)};

    border-bottom: 1px solid #e9e9e9;
    display: block;
`
const ToMain = styled(Tooltip) `
    position: absolute;
    top: 50%;
    right: -11px;
    z-index: 2;

    display: none;

    cursor: pointer;
    transform: translateY(-50%);

    .ra-tooltip {
        z-index: 5;
        padding: 4px 9px;
        color: #666;
        font-family: ${font.opensans};
        font-size: 11px;
        font-weight: 400;
        box-shadow: 1px 1px 5px rgba(0,0,0,.28);
        background-color: #fff;
    }
    .ra-tooltip-message:after {
        display: none
    }

    p {
        color: inherit;
        padding: 0;
    }
`

class Item extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    }

    render() {
        const {
            data,
            children,
            style,
            toMain,
            isDragging,
            connectDragSource
        } = this.props;

        return connectDragSource(
            <div style={{opacity: isDragging ? 0.7:1}}>
                <Root style={style}>
                    <Wrapper>
                        {children}
                        <ToMain message="На главную" eventType="hover" direction="bottom">
                            <Icon
                                type="go-right"
                                onClick={e => {
                                    toMain(data)
                                    e.stopPropagation()
                                }} />
                        </ToMain>
                    </Wrapper>
                </Root>
            </div>
        )
    }
}

const spec = {
    beginDrag(props) {
        return {
            data: props.data
        }
    },
    endDrag(props, monitor) {
        const result = monitor.getDropResult()

        if (result) {
            props.toMain(props.data, result.category)
        }

        return {
            data: props.data
        }
    }
}

const DragDecorator = DragSource('newsItem', spec, function(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
});

export default DragDecorator(Item)
