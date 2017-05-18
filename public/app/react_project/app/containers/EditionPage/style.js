import styled from 'styled-components';
import Table from 'components/Table';
import { Wrap, Left, Right } from 'components/Content';
import TypedBtn from 'components/Button/TypedBtn';
import { color, padding } from 'constants/style';
import { rem } from 'utils/style';

export const Wrapper = styled(Wrap)`
    padding-top: 8px;
    padding-left: ${padding};
`;

export const LeftColumn = styled(Left)`
    padding-right: 22px;
`;

export const RightColumn = styled(Right)`
    flex-basis: 42.54%;
    width: 42.54%;
`;

export const StyledTable = styled(Table)`
    .table-blocked {
        color: ${color.danger};
    }

    tr {
        &:hover {

            .table-user {
                color: #333;
                font-weight: 600;
            }
        }
    }
`;

export const StyledTypedBtn = styled(TypedBtn)`
    &:not(:last-child) {
        margin-right: ${rem(6)};
    }
`;
