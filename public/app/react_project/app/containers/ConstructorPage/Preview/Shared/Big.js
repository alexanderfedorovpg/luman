import React from 'react'
import styled from 'styled-components'
import { FormattedRelative } from 'react-intl'

import ImgBase from './Img'

import { rem } from 'utils/style'
import { font, color } from 'constants/style'

import logo from './blue-rtvi.png'

const Root = styled.div`

    position: relative;

    width: ${rem(617)};
    height: ${rem(505)};


    &::before {
        content: '';

        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;

        display: block;
        width: inherit;
        height: inherit;

        background: rgba(0,0,0,.5);
        transition: background .5s ease-out;
    }

    &:hover::before {
        background: rgba(0,0,0,.3);
    }
`

const Img = styled(ImgBase)`
    width: inherit;
    height: inherit;
    object-fit: cover;
`

const Info = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;

    width: inherit;
    padding-right: ${rem(113)};
    padding-left: ${rem(20)};
    padding-bottom: ${rem(25)};
`

const Title = styled.p`
    font-family: ${font.stemReg};
    font-size: ${rem(36)};
    line-height: ${rem(42)};
    color: ${color.white};
`

const TimeAdd = styled.p`
    font-size: ${rem(12)};
    line-height: ${rem(42)};
    color: ${color.gray};
`

const TimeUpdate = styled.p`
    margin-top: ${rem(-15)};

    font-size: ${rem(12)};
    line-height: ${rem(18)};
    color: ${color.purple};
    letter-spacing: ${rem(-.7)};
`

const Logo = styled.div`
    position: absolute;
    z-index: 0;
    right: 0;
    bottom: 0;

    display: inline-block;
    width: ${rem(146)};
    height: ${rem(83)};

    span {
        position: absolute;
        z-index: 1;
        top: ${rem(8)};
        left: ${rem(14)};

        font-size: ${rem(16)};
        line-height: ${rem(18)};
        color: ${color.white};
        text-transform: uppercase;
    }
`

function Big({ data, title }) {
    if (!data) return null

    const image = (data.image_preview||{}).url

    return (
        <Root>
            <Img src={image} alt="" role="presentation" />
            <Info>
                <Title>
                    {title
                        ? `${title}: ${data.title}`
                        : data.title
                    }
                </Title>
                <TimeAdd>
                    {Date.parse(data.publish_date)
                        ? <FormattedRelative value={data.publish_date} units="minute" />
                        : null
                    } /
                </TimeAdd>
                <TimeUpdate>
                    {'Обновлено '}
                    {Date.parse(data.updated_at)
                        ? <FormattedRelative value={data.updated_at} units="minute" />
                        : null
                    }
                </TimeUpdate>
                <Logo>
                    <span>News</span>
                    <img src={logo} alt="" role="presentation" />
                </Logo>
            </Info>
        </Root>
    )
}

export default Big
