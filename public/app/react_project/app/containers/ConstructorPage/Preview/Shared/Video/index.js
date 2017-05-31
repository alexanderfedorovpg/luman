import React from 'react'
import styled from 'styled-components'
import { FormattedDate } from 'react-intl'

import ImgBase from '../Img'

import { rem } from 'utils/style'
import { color } from 'constants/style'
import icon from './video-ico.png'
import logo from './purple-rtvi.png'

const Root = styled.div`
    position: relative;
    overflow: hidden;
    transition: height .3s;

    height: ${rem(593)};

    &::before {
        content: '';

        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;

        display: block;
        width: ${rem(300)};
        height: ${rem(593)};

        background-color: rgba(0, 0, 0, .32);
    }
`

const Img = styled(ImgBase)`
    width: ${rem(300)};

    object-fit: cover;
    object-position: top;
`

const Info = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;

    width: ${rem(300)};
`

const Datetime = styled.div`
    margin-left: ${rem(18)};

    font-size: ${rem(16)};
    line-height: ${rem(18)};
    color: ${color.white};
    position: relative;

    margin-bottom: ${rem(11)};
`

const Title = styled.div`
    padding-top: ${rem(10)};
    padding-bottom: ${rem(10)};
    display: block;
    width: ${rem(250)};
    padding-right: ${rem(75)};
    padding-left: ${rem(18)};

    font-size: ${rem(16)};
    line-height: ${rem(18)};
    color: ${color.white};

    background-color: ${color.dark};
`

const Span = styled.span`
    position: absolute;
    top: calc(50% - ${rem(9)});
    left: 31px;
`

const Icon = styled.img`
    width: ${rem(36)};
    height: ${rem(36)};
`

const Logo = styled.div`
    position: absolute;
    z-index: 0;
    right: 0;
    bottom: 0;

    display: inline-block;
    width: ${rem(137)};
    height: ${rem(79)};
    background-image: url(${logo});
    background-size: contain;
`

const LogoTitle = styled.span`
    position: absolute;
    z-index: 1;
    top: ${rem(5)};
    left: ${rem(4)};

    font-size: ${rem(16)};
    line-height: ${rem(18)};
    color: ${color.white};
    text-transform: uppercase;
`

function Video({ data }) {

    const video = data.video

    return (
        <Root>
            <Img src={video.preview} alt="" />
            <Info>
                <Datetime>
                    <Icon src={icon} alt="" role="presentation" />
                    <Span>
                        {Date.parse(data.publish_date) &&
                            <FormattedDate
                                value={data.publish_date}
                                day="2-digit"
                                month="long" />
                        }
                    </Span>
                </Datetime>
                <Title>
                    Все ключевые события этого дня
                </Title>
                <Logo>
                    <LogoTitle>
                        Today
                    </LogoTitle>
                </Logo>
            </Info>
        </Root>
    )
}

export default Video
