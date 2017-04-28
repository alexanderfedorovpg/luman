import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { rem } from 'utils/style';
import DatePicker from 'react-datepicker';
import { Calendar } from 'components/Icon/svg';

import 'react-datepicker/dist/react-datepicker.css';
import { inputCSS } from './Input';

moment.locale('ru');

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

const Datepicker = ({ startDate, selected, className, onChange, ...props }) => (
    <Wrapper className={className}>
        <StyledDatePicker
            startDate={startDate ? moment(startDate) : null}
            dateFormat="DD.MM.YYYY"
            selected={selected ? moment(selected) : null}
            onChange={(date) => onChange(date.format('YYYY-MM-DD h:mm:ss'))}
            {...props}
        />
        <Icon />
    </Wrapper>
);

Datepicker.defaultProps = {
    onChange: () => {},
    placeholderText: 'Дата',
};

Datepicker.propTypes = {
    selected: PropTypes.string,
    startDate: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default Datepicker;
