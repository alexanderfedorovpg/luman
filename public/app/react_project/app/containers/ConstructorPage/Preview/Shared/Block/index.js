import React from 'react'
import styled, { css } from 'styled-components'
import { FormattedRelative } from 'react-intl'

import ImgBase from '../Img'
import MiniBase from '../Mini'

import { rem, ifProp } from 'utils/style'
import { font, color } from 'constants/style'

const Root = styled.div`
    position: relative;

    width: ${rem(301)};
    height: ${rem(245)};

    &::before {
        content: '';

        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;

        display: block;
        width: inherit;
        height: inherit;

        background: rgba(0,0,0,.5);
        transition: background .5s ease-out;
    }

    &:hover::before {
        background: rgba(0,0,0,.3);
    }

    ${ifProp('rectangle')(css`
        width: ${rem(617)};
        height: ${rem(250)};

        &::before {
            z-index: 1;
            top: auto;
            bottom: 0;
        }
    `)}

    ${ifProp('list')`
        &::before {
            display: none !important;
        }
    `}

    ${ifProp('war')(css`
        height: ${rem(223)} !important;
        overflow: hidden;
    `)}
`

const Img = styled(ImgBase)`
    width: inherit;
    height: inherit;
    object-fit: cover;
`

const Info = styled.div`
    position: absolute;
    z-index: 1;
    bottom: ${rem(9)};
    left: 0;

    width: ${rem(280)};
    padding-left: ${rem(20)};

    ${ifProp('rectangle')(css`
        bottom: ${rem(2)};

        width: ${rem(345)};
    `)}
`

const Title = styled.p`
    margin: 0;

    margin-bottom: ${rem(3)};

    font: ${rem(18)}/${rem(21)} ${font.stemReg};
    font-weight: 700;
    color: ${color.white};
    letter-spacing: ${rem(-.9)};
    letter-spacing: ${rem(-.9)};

    ${ifProp('rectangle')(css`
        font: ${rem(24)}/${rem(26)} ${font.stemReg};
    `)}
`

const TimeAdded = styled.p`
    font-size: ${rem(12)};
    line-height: ${rem(32)};
    color: ${color.gray};
`

const TimeUpdated = styled.span`
    color: ${color.purple};
`

const Mini = styled(MiniBase)`
    padding-top: ${rem(6)};
    padding-bottom: 0;

    border-bottom: 0 !important;

    &:not(:first-child) {
        margin-top: ${rem(3)};
    }

    &:first-child {
        padding-top: ${rem(3)};
    }

    .mini-news__title {
        display: inline-block;

        font-size: ${rem(14)};

        line-height: ${rem(16)};
        letter-spacing: ${rem(-.1)};
    }
    .mini-news__date {
        margin-top: ${rem(-1)};
    }
`

const WarTitle = styled.p`
    position: relative;

    display: inline-block;

    font: ${rem(12)}/${rem(24)} ${font.stemReg};
    color: ${color.white};
    text-transform: uppercase;
    width: ${rem(230)};

    &::before {
        content: '';

        position: absolute;
        z-index: -1;
        top: 0;
        left: ${rem(-75)};

        display: block;
        width: calc(100% + ${rem(80)});
        height: 100%;

        background-color: ${color.war};
        transform: skew(-30deg);
    }
`

function Block({ data, rectangle, className, warTitle }) {
    if (!data) return null

    if (data.list) return (
        <Root className={className} list>
            {data.list.map((value, i) => (
                <Mini key={i} data={value} />
            ))}
        </Root>
    )

    const video = data.video_stream
    const image = (data.image_preview||{}).url

    return (
        <Root className={className} rectangle={rectangle} war={warTitle}>
            <Img src={image} />
            <Info rectangle={rectangle}>
                <Title rectangle={rectangle}>
                    {data.title}
                </Title>
                {warTitle
                    ? (
                        <WarTitle>
                            {warTitle}
                        </WarTitle>
                    )
                    : (
                        <TimeAdded>
                            {Date.parse(data.publish_date)
                                ? <FormattedRelative value={data.publish_date} />
                                : null
                            }
                            {Date.parse(data.updated_at)
                                ? (
                                    <TimeUpdated>
                                        / Обновлено <FormattedRelative value={data.updated_at} />
                                    </TimeUpdated>
                                )
                                : null
                            }
                        </TimeAdded>
                    )
                }
            </Info>
        </Root>
    )
}

export default Block
