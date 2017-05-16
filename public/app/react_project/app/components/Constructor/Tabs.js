import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router'

import { font } from 'constants/style';
import { rem, ifProp } from 'utils/style';

const Root = styled.div`
    padding-bottom: 0.625rem;
    padding-left: 1.5rem;
    margin-top: 0.0625rem;
    margin-left: 0.0625rem;
    border-bottom: 1px solid #e8e8e8;
`;

const Item = styled(({ active, ...rest }) => <Link {...rest} />)`
    margin-right: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #006699;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
        color: #000;
        cursor: pointer;
    }

    ${ifProp('active')`
        color: #000;
    `}
`;

function Tabs({ router }) {

    return (
        <Root>
            <Item
                to="/constructor/news"
                active={
                    router.isActive('/constructor/news') ||
                    router.isActive('/constructor/war')
                }>
                Новости
            </Item>
            <Item
                to="/constructor/noise"
                active={router.isActive('/constructor/noise')}>
                Инфошум
            </Item>
            <Item
                to="/constructor/broadcast"
                active={router.isActive('/constructor/broadcast')}>
                Из эфира
            </Item>
        </Root>
    )
}

export default withRouter(Tabs)
