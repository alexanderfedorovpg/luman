import styled from 'styled-components';
import Table from 'components/Table';
import User from 'components/User';
import { Wrap, Left, Right } from 'components/Content';
import TypedBtn from 'components/Button/TypedBtn';
import { color, padding } from 'constants/style';
import { rem } from 'utils/style';

export const StyledUser = styled(User)`
    margin-top: 2px;
    margin-bottom: 15px;
    margin-left: 3px;

    font-size: 24px;
    font-weight: 600;
    color: #333333;
    letter-spacing: -0.6px;
`;

export const CloseBtn = styled.button`
    position: absolute;
    top: 11px;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;

    border: none;
    background: transparent;
`;

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
