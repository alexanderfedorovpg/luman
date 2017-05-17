import React from 'react'
import styled from 'styled-components'

import { color, font } from 'constants/style'
import { rem, clearfix } from 'utils/style'

export const Root = styled.div`
    border: 1px solid rgba(204, 204, 204, 0.74);

    min-height: 20px;
    margin-top: ${rem(27)};
    padding-top: ${rem(9)};
    padding-bottom: ${rem(34)};
`

export const Item = styled.div`
    position: relative;

    display: flex;
    align-items: baseline;
    padding-top: ${rem(14)};
    padding-right: ${rem(39)};
    padding-bottom: ${rem(14)};
    padding-left: ${rem(21)};
    margin-bottom: ${rem(-10)};

    color: ${color.enter};

    cursor: pointer;

    &:hover {
        color: ${color.purple};

        background-color: #f0f1f2;

        .social-links {

            display: flex;
            margin-top: 0;

        }
    }

    &.is-important {

        p.timeline__title {
            font-family: ${font.opensans};
            font-size: ${rem(18)};
            font-weight: 700;
            line-height: ${rem(24)};
        }
    }
`

export const Left = styled.time`
    flex-shrink: 0;
    width: ${rem(40)};
    margin-right: ${rem(4)};
    font-family: ${font.opensans};
    font-size: ${rem(12)};
    color: ${color.purple};
`

export const Right = styled.div`
    ${clearfix}
`

export const Title = styled.div`
    margin-top: 0;
    margin-bottom: 0;

    font-family: ${font.opensans};
    font-size: ${rem(14)};
    line-height: ${rem(19)};
    color: inherit;
    letter-spacing: ${rem(-0.16)};
`

export const Img = styled.div`
    margin-top: ${rem(11)};

    img {
        max-width: 100%;
    }
`

export const Video = styled.div`
    margin-top: ${rem(11)};

    img {
        max-width: 100%;
    }
`
