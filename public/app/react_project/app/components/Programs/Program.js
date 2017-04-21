import React from 'react';
import PropTypes from 'prop-types';
import { FormattedTime, FormattedDate } from 'react-intl';
import HashTags from 'components/HashTags';
import { Close, ArrowUp } from 'components/Icon/svg';
import {
    Wrapper,
    ImgWrapper,
    Img,
    ImgOverlay,
    PlayBtn,
    Info,
    ProgramDate,
    Time,
    Category,
    Title,
    Buttons,
    StyledBtn,
} from './program-elements';

const Program = ({
    active,
    src,
    date,
    category,
    title,
    hashTags,
    onDelete,
    onEdit,
    onPreviewClick
}) => {
    const dateObj = new Date(Date.parse(date));

    return (
        <Wrapper active={active}>
            <ImgWrapper onClick={onPreviewClick} href="#">
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
                        {' '}
                        <Time>
                            <FormattedTime value={dateObj} />
                        </Time>
                    </ProgramDate>
                }
                <Category href="#">{category}</Category>
                <Title>{title}</Title>
                {
                    !!hashTags &&
                    <HashTags tags={hashTags} />
                }
            </Info>
            <Buttons className="program-buttons">
                <StyledBtn danger className="program-btn" onClick={onDelete}>
                    <Close width="14px" height="14px" /> Удалить
                </StyledBtn>
                <StyledBtn primary className="program-btn" onClick={onEdit}>
                    <ArrowUp className="programs-icon" width="12px" height="14px" /> Редактировать
                </StyledBtn>
            </Buttons>
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
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onPreviewClick: PropTypes.func,
};

export default Program;
