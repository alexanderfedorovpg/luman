import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router'
import { FormattedRelative, FormattedTime } from 'react-intl'

import ImgBase from './Img'

import { rem, ifProp } from 'utils/style'
import { color, font } from 'constants/style'

const Root = styled.div`
    position: relative;

    padding-top: ${rem(25)};
    padding-bottom: ${rem(15)};
    overflow: hidden;

    &:not(:last-child) {
        border-bottom: 1px solid ${color.gray};
    }

    ${ifProp('compact')(css`
        &::before {
            content: '';

            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;

            opacity: 0;
            width: 100%;
            height: 100%;

            background: rgba(0,0,0,.5);
            transition: all .5s ease-out;
        }

        &:hover::before {
            opacity: 1;
            background: rgba(0,0,0,.5);
        }

        &:first-child {
            padding-top: 0 !important;
            padding-bottom: ${rem(13)} !important;
        }

        &:hover {

            .mini-news__img {
                opacity: 1;
                visibility: visible;
            }

            .mini-news__info {
                transform: translateX(${rem(18)});
            }

            .mini-news__title {
                color: ${color.white} !important;
            }
        }
    `)}
`

const Img = styled(ImgBase)`
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;

    display: block;
    width: auto;
    min-width: 100%;
    height: auto;
    min-height: 100%;

    opacity: 0;
    transform: translate(-50%, -50%);
    visibility: hidden;

    transition: all .5s ease-in-out;
`

const Info = styled.div`
    position: relative;
    z-index: 1;

    transition: all .5s ease-in-out;
`

const Title = styled(Link)`
    font: ${rem(18)}/1.275rem ${font.stemReg};
    font-weight: 700;
    color: ${color.dark};
    text-decoration: none;

    transition: color .5s ease-in-out;
`

const Datetime = styled.p`
    margin-top: ${rem(3)};

    font-size: ${rem(12)};
    line-height: ${rem(24)};
    color: ${color.grayDate};
`

function Mini({ data, compact, className }) {

    const image = (data.image_preview||{}).url

    return (
        <Root className={className} compact={compact}>
            <Img src={image} alt="" role="presentation" className="mini-news__img" />
            <Info className="mini-news__info">
                <Title className="mini-news__title">
                    {data.title}
                </Title>
                {Date.parse(data.publish_date)
                    ? (
                        <Datetime className="mini-news__date">
                            <FormattedRelative value={data.publish_date} units="day" />
                            {', '}
                            <FormattedTime value={data.publish_date}
                                minute="2-digit"
                                hour="2-digit" />
                        </Datetime>
                    )
                    : null
                }
            </Info>
        </Root>
    )
}

export default Mini
