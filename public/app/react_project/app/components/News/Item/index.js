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
    Rubric,
    Title,
    StyledTags,
    ActionBtn,
} from './style';

const NewsItem = ({ active, date, rubric, rating, title, hashTags, actionBtn, actionBtnClick }) => {
    const dateObj = new Date(Date.parse(date));
    return (
        <Wrapper active={active}>
            <RightColumn>
                <Header>
                    <StyledRating checked={rating} rating={rating} disabled />
                    <Rubric>{rubric}</Rubric>
                </Header>
                <Title rating={rating}>{title}</Title>
                {
                    !!hashTags && <StyledTags tags={hashTags} />
                }
                {
                    !!actionBtn &&
                    <ActionBtn
                        message={actionBtn}
                        eventType="hover"
                        icon="go-right"
                        onClick={actionBtnClick}
                    />
                }
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

NewsItem.propTypes = {
    date: PropTypes.string,
    rubric: PropTypes.string,
    rating: PropTypes.number,
    title: PropTypes.string,
    hashTags: PropTypes.arrayOf(PropTypes.string),
    actionBtn: PropTypes.string,
    actionBtnClick: PropTypes.func,
    active: PropTypes.bool,
};

export default NewsItem;
