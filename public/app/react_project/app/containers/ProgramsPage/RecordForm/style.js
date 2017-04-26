import styled from 'styled-components';
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
