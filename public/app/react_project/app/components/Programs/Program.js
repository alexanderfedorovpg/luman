import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import HashTags from 'components/HashTags';
import {
    Wrapper,
    ImgWrapper,
    Img,
    ImgOverlay,
    PlayBtn,
    Info,
    ProgramDate,
    StyledFormattedTime,
    Category,
    Title,
    Buttons,
} from './program-elements';

const Program = ({ active, src, date = '2017-04-20 11:52:38', category, title, hashTags }) => {
    const dateObj = new Date(Date.parse(date));

    return (
        <Wrapper active={active}>
            <ImgWrapper href="#">
                <Img src={src} alt="" role="presentation" />
                <ImgOverlay className="program-img-overlay">
                    <PlayBtn />
                </ImgOverlay>
            </ImgWrapper>
            <Info>
                {
                    !!date &&
                    <ProgramDate dateTime={date}>
                        <FormattedDate
                            value={dateObj}
                            year="numeric"
                            month="long"
                            day="2-digit"
                        />,
                        <StyledFormattedTime value={dateObj} />
                    </ProgramDate>
                }
                <Category href="#">{category}</Category>
                <Title>{title}</Title>
                <HashTags tags={hashTags} />
            </Info>
            <Buttons />
        </Wrapper>
    );
};

Program.propTypes = {
    active: PropTypes.bool,
    src: PropTypes.string,
    date: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    hashTags: PropTypes.arrayOf(PropTypes.string),
};

export default Program;
