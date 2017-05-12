import styled from 'styled-components';
import { Wrap } from 'components/Content';
import TypedBtn from 'components/Button/TypedBtn';

const height = 40;

export const StyledBtn = styled(TypedBtn)`
    width: 50%;
    height: ${height}px;
    line-height: ${height - 2}px;

    &:not(:last-child) {
        margin-right: 3px;
    }
`;

export const Content = styled(Wrap)`
    flex-direction: column;

    .programs-icon {
        color: #c1c8bd;
    }
`;

export const Wrapper = styled.div`
    .programs-icon {
        color: #c1c8bd;
    }
`;
