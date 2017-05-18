import styled from 'styled-components';
import RadioButtonsGroup from 'components/Form/RadioButtonsGroup';
import { rem } from 'utils/style';

export const Form = styled.form`
    position: relative;

    margin-top: 8px;
`;

export const GroupControls = styled(RadioButtonsGroup)`
    margin-bottom: ${rem(23)};
`;
