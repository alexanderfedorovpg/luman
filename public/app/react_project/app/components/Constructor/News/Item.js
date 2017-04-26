import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'
import styled from 'styled-components'
import Tooltip from 'react-aria-tooltip'
import Rating from 'components/Rating/Item'
import Icon from 'components/Icon'
import { font, padding } from 'constants/style'

const CustomRating = styled(Rating) `
    margin-right: .4rem;
    margin-bottom: 0;
`

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
    display: block;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    padding-top: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding-top: 12px;
    padding-right: 24px;
    padding-bottom: 12px;
`

const Header = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 30px;
`

// const Rating = styled.div`
//     position: relative;
//     z-index: 5;
//     display: block;
//     width: 28px;
//     height: 28px;
//     font-family: "HelveticaNeue", Helvetica, Arial, sans-serif;
//     font-size: 0.875rem;
//     font-weight: 700;
//     line-height: 1.75rem;
//     color: #ffffff;
//     text-align: center;
//     cursor: pointer;
//     width: 28px;
//     height: 28px;
//     margin-bottom: 28px;
//         margin-right: 7px;
//     margin-bottom: 0;
//     background-color: #ff4e00;
// `

const ItemIcon = styled(Icon) `
    flex-shrink: 0;
`

const Title = styled.span`

    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    color: #333333;
    font-weight: bold;
    font-size: 19px;
    line-height: 24px;
    letter-spacing: -0.15px;
`

const Work = styled(Tooltip) `
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

const Ignore = styled(Work) `
    right: 24px;
`

const TagName = styled.p`
    margin: 0;
    font-family: "Open Sans", Arial, sans-serif;
    font-size: 11px;
    font-weight: 400;
    color: #999999;
    text-transform: uppercase;
`

const Attachment = styled.p`
    margin-top: 7px;
    margin-bottom: 3px;
    font-family: 'Open Sans';
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    letter-spacing: -0.7px;
    text-transform: uppercase;
`

const itemSource = {
    beginDrag(props) {
        return {
            data: props.data
        }
    }
}

const itemType = 'newsItem';

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Item extends React.Component{
    constructor(props) {
        super(props);
        // console.log(this.props);
    }
    static propTypes = {
        data: React.PropTypes.object.isRequired,
        // connectDragSource: React.PropTypes.func.isRequired,
        // isDragging: React.PropTypes.bool.isRequired
    }

    render() {
        const { data, toWork, hide, open, style, isDragging, connectDragSource } = this.props;

        return (
        // return connectDragSource(
            <div style={{opacity: isDragging ? 0.5:1}}>
                <Root onClick={() => open(data.id)} style={style}>
                    <Wrapper>
                        {/*<ItemIcon type="tass" />*/}
                        <Header>
                            <CustomRating rating={data.top} checked={data.top} />
                            <TagName>
                                {data.tags
                                    .filter(value => !!value.trim())
                                    .map(tag => (
                                        <span key={tag}>
                                            {`${tag} `}
                                        </span>
                                    ))
                                }
                            </TagName>
                        </Header>
                        <Title>
                            {data.title}
                        </Title>
                        <Attachment>
                            1 Фото + 1 Видео
                        </Attachment>
                        <Ignore message="Не для главной" eventType="hover" direction="bottom">
                            <Icon
                                type="delete"
                                onClick={e => {
                                    hide(data.id)
                                    e.stopPropagation()
                                }} />
                        </Ignore>
                        <Work message="На главную" eventType="hover" direction="bottom">
                            <Icon
                                type="go-right"
                                onClick={e => {
                                    toWork(data.id)
                                    e.stopPropagation()
                                }} />
                        </Work>
                    </Wrapper>
                </Root>
            </div>
        )
    }
}

const DragDecorator = DragSource(itemType, itemSource, function(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
});

// @DragDecorator
export default Item;
