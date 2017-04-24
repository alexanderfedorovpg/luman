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
    RecordDate,
    Time,
    Program,
    Title,
    Buttons,
    StyledBtn,
} from './style';

const Record = ({
    active,
    preview,
    date,
    program,
    title,
    hashTags,
    onDelete,
    onEdit,
    onPreviewClick,
}) => {
    const dateObj = new Date(Date.parse(date));

    return (
        <Wrapper active={active}>
            <ImgWrapper onClick={onPreviewClick} href="#">
                <Img src={preview} alt="" role="presentation" />
                <ImgOverlay className="record-img-overlay">
                    <PlayBtn />
                </ImgOverlay>
            </ImgWrapper>
            <Info>
                {
                    !!date &&
                    <RecordDate dateTime={date}>
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
                    </RecordDate>
                }
                <Program href="#">{program}</Program>
                <Title>{title}</Title>
                {
                    !!hashTags &&
                    <HashTags tags={hashTags} />
                }
            </Info>
            <Buttons className="record-buttons">
                <StyledBtn danger className="record-btn" onClick={onDelete}>
                    <Close width="14px" height="14px" /> Удалить
                </StyledBtn>
                <StyledBtn primary className="record-btn" onClick={onEdit}>
                    <ArrowUp className="record-icon" width="12px" height="14px" /> Редактировать
                </StyledBtn>
            </Buttons>
        </Wrapper>
    );
};

Record.propTypes = {
    active: PropTypes.bool,
    preview: PropTypes.string,
    date: PropTypes.string,
    program: PropTypes.string,
    title: PropTypes.string,
    hashTags: PropTypes.arrayOf(PropTypes.string),
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onPreviewClick: PropTypes.func,
};

export default Record;
