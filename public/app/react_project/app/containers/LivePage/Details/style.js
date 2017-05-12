import styled, { css } from 'styled-components';
import { rem } from 'utils/style';
import { Checkbox, Textarea } from 'components/Form';

export const Wrapper = styled.div`
    width: 40%;
    padding-top: .4rem;
    padding-left: 1.7rem;
    padding-bottom: ${rem(25)};
`;

const displayStyles = css`
    width: 100%;
    height: ${rem(300)};
    margin: 0;
    margin-bottom: ${rem(20)};
    padding: 0;
`;

export const DisplayStream = styled.iframe`
    ${displayStyles}

    background: #eee;
`;

export const DisplayEmpty = styled.div`
    ${displayStyles}
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;

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
