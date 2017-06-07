import React, {PropTypes} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment'

import icon from './icon.png';

import 'react-datepicker/dist/react-datepicker.css';

import './style.scss';

moment.locale('ru');

// const Wrapper = styled.div`
//     position: relative;

//     display: inline-block;
//     width: ${rem(130)};

//     vertical-align: top;
// `;

// const StyledDatePicker = styled(DatePicker)`
//     ${inputCSS}
//     display: block;
//     width: 100%;
//     padding-right: ${rem(40)};
// `;

// const Icon = styled(Calendar)`
//     position: absolute;
//     top: 50%;
//     right: ${rem(13)};

//     color: #828282;

//     pointer-events: none;
//     transform: translateY(-50%);
// `;

const Datepicker = ({ startDate, selected, className, onChange, ...props }) => (
    <div className={className+' datepicker'}>
        <DatePicker
            startDate={startDate ? moment(startDate) : null}
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
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default Datepicker;
