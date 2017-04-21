import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedTime } from 'react-intl';
import {
    Wrapper,
    LeftColumn,
    RightColumn,
    StyledDate,
    StyledTime,
    Header,
    StyledRating,
    Category,
    Title,
    StyledTags,
    ToLive,
} from './style';

const LiveItem = ({ date, category, rating, title, hashTags, toLiveClick }) => {
    const dateObj = new Date(Date.parse(date));
    return (
        <Wrapper>
            <RightColumn>
                <Header>
                    <StyledRating checked={rating} rating={rating} disabled />
                    <Category>{category}</Category>
                </Header>
                <Title rating={rating}>{title}</Title>
                {
                    !!hashTags && <StyledTags tags={hashTags} />
                }
                <ToLive
                    message="В прямой эфир"
                    eventType="hover"
                    icon="go-right"
                    onClick={toLiveClick}
                />
            </RightColumn>
            <LeftColumn>
                {
                    !!date &&
                    <time dateTime={date}>
                        <StyledDate>
                            <FormattedDate
                                value={dateObj}
                                year="numeric"
                                month="long"
                                day="2-digit"
                            />
                        </StyledDate>
                        <StyledTime>
                            <FormattedTime value={dateObj} />
                        </StyledTime>
                    </time>
                }
            </LeftColumn>
        </Wrapper>
    );
};

LiveItem.propTypes = {
    date: PropTypes.string,
    category: PropTypes.string,
    rating: PropTypes.number,
    title: PropTypes.string,
    hashTags: PropTypes.arrayOf(PropTypes.string),
    toLiveClick: PropTypes.func,
};

export default LiveItem;
