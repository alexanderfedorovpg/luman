import styled from 'styled-components';
import { Group, Label } from 'components/Form';
import { rem } from 'utils/style';

export const Form = styled.form`
    position: relative;

    margin-top: 8px;
`;

export const RadioGroup = styled(Group)`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: ${rem(23)};

    > * {
        flex-basis: 38%;
        width: 38%;
        margin-bottom: 12px;
        padding-right: 10px;
    }
`;

export const StyledLabel = styled(Label)`
    width: 100%;
    flex-basis: 100%;
`;
