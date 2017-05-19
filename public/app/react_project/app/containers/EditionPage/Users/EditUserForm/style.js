import styled from 'styled-components';
import { rem } from 'utils/style';
import ControlsGroup from 'components/Form/ControlsGroup';

export const Form = styled.form`
    position: relative;
`;

export const StyledControlsGroup = styled(ControlsGroup)`
    padding-bottom: ${rem(5)};
    margin-bottom: ${rem(15)};

    border-bottom: 1px solid #d7d7d7;
`;

export const CloseBtn = styled.button`
    position: absolute;
    top: 11px;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;

    border: none;
    background: transparent;
`;
