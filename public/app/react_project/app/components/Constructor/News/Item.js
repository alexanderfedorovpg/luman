import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

import DragSourceWrapper from '../DragSource'
import Rating from 'components/Rating/Item'

import { font, padding } from 'constants/style'

const CustomRating = styled(Rating) `
    margin-right: .4rem;
    margin-bottom: 0;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
`

const Title = styled.span`
    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    color: #333;
    font-weight: bold;
    font-size: 19px;
    line-height: 24px;
    letter-spacing: -0.15px;
`

const Rubrics = styled.p`
    margin: 0;
    font-family: ${font.opensans};
    font-size: 11px;
    font-weight: 400;
    color: #999;
    text-transform: uppercase;
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
                <Header>
                    <CustomRating rating={data.top} checked={data.top} />
                    <Rubrics>
                        {data.rubrics_id
                            .map(rubric => (
                                <span key={rubric.id}>
                                    {rubric.name}
                                </span>
                            ))
                        }
                    </Rubrics>
                </Header>
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
