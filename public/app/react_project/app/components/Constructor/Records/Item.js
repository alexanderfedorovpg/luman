import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

import DragSourceWrapper from '../DragSource'

import { font, padding } from 'constants/style'

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

class Item extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
    }

    render() {
        const { data, toMain } = this.props;

        return (
            <DragSourceWrapper data={data} toMain={toMain}>
                <Title>
                    {data.title}
                </Title>
                <Attachment>
                    1 Фото + 1 Видео
                </Attachment>
            </DragSourceWrapper>
        )
    }
}

export default Item
