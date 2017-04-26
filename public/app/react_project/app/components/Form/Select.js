import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { rem } from 'utils/style';
import { height } from 'constants/style';
import { inputCSS } from './Input';

export default styled(Select)`
    .Select-control {
        ${inputCSS}
        display: table;

        border-radius: 0;
    }

    .Select-placeholder {
        line-height: ${height};
        color: #ccc;
    }

    .Select-placeholder,
    & > .Select-control .Select-value,
    .Select-option {
        font-size: ${rem(14)};
    }

    &.has-value > .Select-control .Select-value .Select-value-label,
    &.has-value.is-pseudo-focused > .Select-control .Select-value .Select-value-label {
        color: #666;
    }

    &.is-open > .Select-control .Select-arrow,
    .Select-arrow {
        width: ${rem(10)};
        height: ${rem(10)};

        border: none;
        border-left: 1px solid #303030;
        border-bottom: 1px solid #303030;

        transform: translateY(-25%) rotate(-45deg);
    }

    &.is-open > .Select-control .Select-arrow {
        transform: translateY(50%) rotate(-225deg);
    }
`;
