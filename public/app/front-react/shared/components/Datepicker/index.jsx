import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import icon from './icon.png';

import 'react-datepicker/dist/react-datepicker.css';

import './style.scss';

moment.locale('ru');

const Datepicker = ({ startDate, endDate, selected, className, onChange, ...props }) => (
    <div className={'datepicker ' + className}>
        <DatePicker
            startDate={startDate ? moment(startDate) : null}
            endDate={endDate ? moment(endDate) : null}
            dateFormat="DD.MM.YYYY"
            selected={selected ? moment(selected) : null}
            onChange={(date) => onChange(date.format('YYYY-MM-DD HH:mm:ss'))}
            {...props}
        />
        <img src={icon} alt=""/>
    </div>
);

Datepicker.defaultProps = {
    onChange: () => {},
    placeholderText: 'Дата',
};

Datepicker.propTypes = {
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default Datepicker;
