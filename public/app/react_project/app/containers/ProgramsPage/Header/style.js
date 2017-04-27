import styled from 'styled-components';
import Button from 'components/Button';
import { rem } from 'utils/style';
import { InputIcon } from 'components/Form';

export const Buttons = styled.div`
    margin-left: auto;
`;

export const StyledBtn = styled(Button)`
    margin-right: ${rem(10)}

    background-color: #fff;
`;

export const Search = styled(InputIcon)`
    width: ${rem(465)};
`;
