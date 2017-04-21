import styled from 'styled-components';
import Tooltip from 'react-aria-tooltip';
import { font } from 'constants/style';

export const Wrapper = styled(Tooltip)`
    cursor: pointer;

    .ra-tooltip {
        z-index: 5;
        padding: 4px 9px;
        color: #666;
        font-family: ${font.opensans};
        font-size: 11px;
        font-weight: 400;
        box-shadow: 1px 1px 5px rgba(0,0,0,.28);
        background-color: #fff;
    }

    .ra-tooltip-message:after {
        display: none
    }

    p {
        color: inherit;
        padding: 0;
    }
`
