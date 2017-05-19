import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router';

import { rem, ifProp } from 'utils/style';
import { font } from 'constants/style';

const Root = styled.div`
    display: flex;
    align-items: center;
    margin-right: ${rem(11)};

    font-size: ${rem(14)};
    color: #666;
    letter-spacing: 0.25px;
`

const Pic = styled(({ letter, ...rest }) => <Link {...rest}/>)`
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    margin-right: ${rem(12)};

    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #fff;

    border-radius: 50%;
    overflow: hidden;

    ${ifProp('letter')(css`
        display: flex;
        align-items: center;
        justify-content: center;

        text-transform: uppercase;

        background-color: #2a2f38;
    `)}
`

const Img = styled.img`
    max-width: 100%;
    max-height: 100%;

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

    color: inherit;
    font-weight: inherit;
    text-decoration: none;
`

function User({ to, data, children, className }) {
    const letterAvatar = data.letterAvatar;
    const url = (data.avatar && data.avatar.url) ? data.avatar.url : '';
    return (
        <Root className={className}>
            <Pic letter={!!letterAvatar} to={to}>
                {url
                    ? <Img src={url} />
                    : letterAvatar || null
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
