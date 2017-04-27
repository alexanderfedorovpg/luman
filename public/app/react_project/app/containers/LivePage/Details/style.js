import styled from 'styled-components';
import { rem } from 'utils/style';
import { Checkbox, Textarea } from 'components/Form';

export const Wrapper = styled.article`
    width: 41.8%;
    padding-top: .4rem;
    padding-left: 1.7rem;
    padding-bottom: ${rem(25)};
`;

export const Display = styled.figure`
    width: 100%;
    height: ${rem(300)};
    margin: 0;
    margin-bottom: ${rem(20)};
    padding: 0;

    background: #eee;
`;

export const StyledCheckbox = styled(Checkbox)`
    &:not(:last-child) {
        margin-right: ${rem(10)};
    }
`;

export const StyledTextarea = styled(Textarea)`
    height: ${rem(110)};
`;
