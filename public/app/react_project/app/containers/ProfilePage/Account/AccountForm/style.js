import styled from 'styled-components';
import { Group } from 'components/Form';
import { InputRedux } from 'components/Form/ReduxForm';
import TypedBtn from 'components/Button/TypedBtn';
import { rem } from 'utils/style';

export const Wrapper = styled.form`
    display: flex;
    width: 55.8%;
    padding: .4rem 1.3rem 0 1.5rem;

    border-right: 1px solid #d2d2d2;
`;

export const Left = styled.div`
    width: 23.5%;
`;

export const Right = styled.div`
    width: 76%;
    padding: 1.15rem 0;
`;

export const Delimiter = styled.hr`
    width: 100%;
    height: .125rem;
    margin: 1.8rem 0;

    color: #d2d2d2;

    border: none;
    background-color: #d2d2d2;
`;

export const JustifyGroup = styled(Group)`
    justify-content: space-between;
`;

export const StyledBtn = styled(TypedBtn)`
    width: 48%;
`;

export const ChangePasswordBtn = styled.button`
    position: absolute;
    top: 1px;
    right: 1px;

    display: flex;
    height: 34px;
    align-items: center;
    padding: 0;
    padding-right: .75rem;

    font-size: .72rem;
    font-weight: 400;
    color: #369;

    background: #fff;
    border: none;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 100%;

        width: rem(20);
        height: 100%;

        background-image: linear-gradient(to right, transparent, #fff);
    }
`;

export const LabelText = styled.span`
    display: block;
    margin-bottom: 5px;
`;
