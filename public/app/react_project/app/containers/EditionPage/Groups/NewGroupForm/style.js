import styled from 'styled-components';
import ControlsGroup from 'components/Form/ControlsGroup';
import { rem } from 'utils/style';

export const Form = styled.form`
    position: relative;

    margin-top: 8px;
`;

export const StyledControlsGroup = styled(ControlsGroup)`
    margin-bottom: ${rem(23)};
`;
