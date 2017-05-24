import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

import { font, padding } from 'constants/style'
import IconTip from 'components/IconTip'

import DragSourceWrapper from '../DragSource'

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

const Attachment = styled.p`
    margin-top: 7px;
    margin-bottom: 3px;
    font-family: {font.opensans};
    font-size: 12px;
    font-weight: 400;
    color: #666;
    letter-spacing: -0.7px;
    text-transform: uppercase;
`

const Remove = styled(IconTip)`
    position: absolute;
    top: 50%;
    right: 24px;
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
    static propTypes = {
        data: PropTypes.object.isRequired,
        onRemove: PropTypes.func.isRequired,
    }

    render() {
        const { data, toMain, onRemove } = this.props;

        return (
            <DragSourceWrapper data={data} toMain={toMain}>
                <Title>
                    {data.title}
                </Title>
                <Attachment>
                    1 Фото + 1 Видео
                </Attachment>
                <Remove
                    message="Убрать из списка"
                    eventType="hover"
                    direction="bottom"
                    icon="delete"
                    onClick={e => {
                        onRemove(data)
                        e.stopPropagation()
                    }}
                />
            </DragSourceWrapper>
        )
    }
}

export default Item
