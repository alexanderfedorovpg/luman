import styled from 'styled-components';
import TypedBtn from 'components/Button/TypedBtn';
import { rem } from 'utils/style';
import { InputIcon } from 'components/Form';

export const Buttons = styled.div`
    margin-left: auto;
`;

export const StyledBtn = styled(TypedBtn)`
    margin-right: ${rem(10)}

    background-color: #fff;
`;

export const Search = styled(InputIcon)`
    width: ${rem(465)};
`;
