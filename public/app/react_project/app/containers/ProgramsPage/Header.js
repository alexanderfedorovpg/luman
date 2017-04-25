import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Bot,
    Left,
    Right,
} from 'components/Header';
import Tabs from 'components/Tabs';
import {
    Horizontal as FormHorizontal,
    InputIcon,
} from 'components/Form';
import {
    ArrowDown,
    Check,
} from 'components/Icon/svg';
import Button from 'components/Button';
import { rem } from 'utils/style';
import { recordsTypes } from './constants';

const Buttons = styled.div`
    margin-left: auto;
`;

const StyledBtn = styled(Button)`
    margin-right: ${rem(10)}

    background-color: #fff;
`;

const Search = styled(InputIcon)`
    width: ${rem(465)};
`;

const Header = ({ type, setRecordsType, moved, onUpload, onSave }) => {
    const active = (recordsTypes.find((item) => item.value === type) || {}).title;

    return (
        <Bot moved={moved}>
            <Left>
                <Tabs data={recordsTypes} onClick={setRecordsType} active={active} />
                <Buttons>
                    <StyledBtn md primary onClick={onUpload}>
                        <ArrowDown className="programs-icon" width="12px" height="14px" /> Загрузить
                    </StyledBtn>
                    <StyledBtn md success onClick={onSave}>
                        <Check className="programs-icon" width="12px" height="12px" /> Сохранить
                    </StyledBtn>
                </Buttons>
            </Left>
            <Right>
                <FormHorizontal>
                    <Search
                        placeholder="Поиск по программам"
                        block
                        icon="search"
                    />
                </FormHorizontal>
            </Right>
        </Bot>
    );
};

Header.propTypes = {
    onUpload: PropTypes.func,
    onSave: PropTypes.func,
    type: PropTypes.string,
    setRecordsType: PropTypes.func,
    moved: PropTypes.bool,
};

export default Header;
