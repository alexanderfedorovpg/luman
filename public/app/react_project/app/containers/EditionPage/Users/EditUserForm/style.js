import styled from 'styled-components';
import User from 'components/User';
import { rem } from 'utils/style';
import RadioButtonsGroup from 'components/Form/RadioButtonsGroup';

export const Form = styled.form`
    position: relative;
`;

export const StyledUser = styled(User)`
    margin-top: 2px;
    margin-bottom: 15px;
    margin-left: 3px;

    font-size: 24px;
    font-weight: 600;
    color: #333333;
    letter-spacing: -0.6px;
`;

export const GroupControls = styled(RadioButtonsGroup)`
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
