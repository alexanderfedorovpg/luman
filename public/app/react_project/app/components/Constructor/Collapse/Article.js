import React, { Component } from 'react'
import styled from 'styled-components'
import { DragSource } from 'react-dnd'

import DropTarget from './DropTarget'
import IconTip from 'components/IconTip'

import { rem } from 'utils/style'
import { font } from 'constants/style'
import { ensureAbs } from 'utils/uri'

const Root = styled.div`
    position: relative;

    padding-right: ${rem(35)};
    padding-left: ${rem(18)};

    cursor: pointer;
    border-top: 1px solid #e8e8e8;

    &:hover {
        background-color: #f3f3f4;

        .ra-tooltip-wrapper {
            display: block;
        }
    }
    &:first-child {
        border-top-color: transparent;
    }
`

const Wrap = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: ${rem(10)};
    padding-bottom: ${rem(10)};
`

const Pic = styled.div`
    flex-shrink: 0;
    width: ${rem(95)};
    height: ${rem(95)};
    margin-right: ${rem(20)};

    img {
        max-height: 100%;
        max-width: 100%;
    }
`

const Rubrics = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 1px;

    span {
        font-size: 11px;
        line-height: 1;
        color: #999;
        letter-spacing: -0.15px;
        text-transform: uppercase;

        &:after {
            content: '/';

            display: inline-block;
            margin-right: 4px;
            margin-left: 3px;
        }
        &:last-child:after {
            display: none;
        }
    }
`

const Title = styled.p`
    margin-top: 7px;
    margin-bottom: 0;

    font-size: 21px;
    line-height: 25px;
    color: #333333;
    letter-spacing: -0.2px;
`

const Media = styled.span`
    font-size: 11px;
    color: #666;
    text-transform: uppercase;
`

const Edit = styled(IconTip)`
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

const Remove = styled(Edit)`
    right: 24px
`

class Article extends Component {

    render() {
        let {
            data,
            onRemove,

            style,
            isOver,
            connectDragSource,
            connectDropTarget,
        } = this.props

        return connectDragSource(connectDropTarget(
            <div style={style}>
                <Root>
                    <Wrap>
                        <Pic>
                            <img src={ensureAbs(data.image_preview)} />
                        </Pic>
                        <div>
                            {data.rubrics
                                ? (
                                    <Rubrics>
                                        {data.rubrics.map(value => (
                                            <span>
                                                {value}
                                            </span>
                                        ))}
                                    </Rubrics>
                                )
                                : null
                            }
                            <Title>
                                {data.title}
                            </Title>
                            <Media>
                                1 ФОТО + 1 ВИДЕО
                            </Media>
                        </div>

                        <Remove
                            message="Убрать с главной"
                            eventType="hover"
                            direction="bottom"
                            icon="delete"
                            onClick={e => {
                                onRemove(data)
                                e.stopPropagation()
                            }} />

                    </Wrap>
                </Root>
            </div>
        ))
    }
}
                // <Edit
                //     message="Редактировать"
                //     eventType="hover"
                //     direction="bottom"
                //     icon="go-right"
                //     onClick={e => {
                //         // hide(data.id)
                //         e.stopPropagation()
                //     }} />

const source = {
    beginDrag(props) {
        return {
            index: props.index,
            data: props.data
        }
    },
    endDrag(props, monitor) {
        props.onMove(-1)

        return {
        }
    }
}

const DragSourceDecorator = DragSource('newsItem', source, function (connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    }
})

export default DragSourceDecorator(DropTarget(Article))
