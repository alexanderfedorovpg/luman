import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'utils/style';
import DatePicker from 'react-datepicker';
import { Calendar } from 'components/Icon/svg';

import 'react-datepicker/dist/react-datepicker.css';
import { inputCSS } from './Input';

const Wrapper = styled.div`
    position: relative;

    display: inline-block;
    width: ${rem(130)};

    vertical-align: top;
`;

const StyledDatePicker = styled(DatePicker)`
    ${inputCSS}
    display: block;
    width: 100%;
    padding-right: ${rem(40)};
`;

const Icon = styled(Calendar)`
    position: absolute;
    top: 50%;
    right: ${rem(13)};

    color: #828282;

    pointer-events: none;
    transform: translateY(-50%);
`;

const Datepicker = ({ className, ...props }) => (
    <Wrapper className={className}>
        <StyledDatePicker
            dateFormat="DD.MM.YYYY"
            {...props}
        />
        <Icon />
    </Wrapper>
);

Datepicker.defaultProps = {
    placeholderText: 'Дата',
};

Datepicker.propTypes = {
    className: PropTypes.string,
};

export default Datepicker;
