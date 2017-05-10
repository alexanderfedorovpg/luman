import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import { rem, ifProp } from 'utils/style';
import { font } from 'constants/style';

const Root = styled.div`
    display: flex;
    align-items: center;
    margin-right: ${rem(11)};
`

const Pic = styled(Link)`
    display: block;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    margin-right: ${rem(12)};
    text-align: center;
`

const Img = styled.img`
    max-width: 100%;
    max-height: 100%;

    border-radius: 50%;

    @supports (object-fit: cover) {
        max-width: none;
        max-height: none;
        width: 100%;
        height: 100%;

        object-fit: cover;
    }
`

export const Name = styled(Link)`
    font-family: ${font.helvetica};
    font-size: ${rem(14)};
    font-weight: 400;

    color: #666;
    text-decoration: none;
    letter-spacing: 0.25px;
`

function User({ to, data, children, className }) {
    let url = data.avatar_url ? `//${data.avatar_url}` : ''
    return (
        <Root className={className}>
            <Pic to={to}>
                {url
                    ? (
                        <Img src={url} />
                    )
                    : null
                }
            </Pic>
            {children
                ? children
                : <Name to={to}>
                    {data.name}
                </Name>}
        </Root>
    )
}

export default User
