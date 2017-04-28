import styled from 'styled-components';
import { Wrap } from 'components/Content';
import Button from 'components/Button';

const height = 40;

export const StyledBtn = styled(Button)`
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
