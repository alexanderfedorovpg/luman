import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import uniqBy from 'lodash/uniqBy';
import moment from 'moment';
import { FormattedRelative } from 'react-intl';
import { font, padding } from 'constants/style';

import Rating from 'components/Rating/Item';
import IconTip from 'components/IconTip';

import DragSourceWrapper from '../DragSource';

const CustomRating = styled(Rating) `
    margin-right: .4rem;
    margin-bottom: 0;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
`;

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
`;

const Rubrics = styled.p`
    margin: 0;
    font-family: ${font.opensans};
    font-size: 11px;
    font-weight: 400;
    color: #999;
    text-transform: uppercase;
`;

const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledDate = styled.time`
    font-size: 12px;
    font-weight: 400;
    color: #666;
`;

const Attachment = styled.p`
    margin-top: 7px;
    margin-bottom: 3px;
    font-family: {font.opensans};
    font-size: 12px;
    font-weight: 400;
    color: #666;
    letter-spacing: -0.7px;
    text-transform: uppercase;
`;

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
`;

class Item extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
    }

    render() {
        const { data, toMain, onRemove, push } = this.props;
        const edited = data.created_at !== data.updated_at;

        return (
            <DragSourceWrapper data={data} toMain={toMain}>
                <Header>
                    <CustomRating rating={data.top} checked={data.top} />
                    <Rubrics>
                        {uniqBy(data.rubrics, (value) => value.id)
                            .map((rubric) => (
                                <span key={rubric.id}>
                                    {rubric.name}
                                </span>
                            ))
                        }
                    </Rubrics>
                </Header>
                <Title onClick={(e) => push(`/editor/${data.id}`)}>
                    {data.title}
                </Title>
                <Footer>
                    <Attachment>
                        1 Фото + 1 Видео
                    </Attachment>
                    {
                        !!Date.parse(data.publish_date) &&
                        <StyledDate dateTime={moment(data.created_at).format('YYYY-MM-DD')}>
                            <FormattedRelative value={data.created_at || data.publish_date} />
                            {
                                edited &&
                                ' / отредактировано'
                            }
                        </StyledDate>
                    }
                </Footer>
                <Remove
                    message="Убрать из списка"
                    eventType="hover"
                    direction="bottom"
                    icon="delete"
                    onClick={(e) => {
                        onRemove(data);
                        e.stopPropagation();
                    }}
                />
            </DragSourceWrapper>
        );
    }
}

export default Item;
