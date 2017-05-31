import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'
import { FormattedDate } from 'react-intl'

import Group from '../Group'
import ImgBase from '../Img'

import { rem } from 'utils/style'
import { color, font } from 'constants/style'

import icon from './video-ico.png'

const Root = styled.div`
    width: ${rem(300)};
`

const Info = styled.div`
    padding-top: ${rem(15)};
    padding-left: ${rem(17)};
`

const TimeKeeping = styled.span`
    position: absolute;
    bottom: ${rem(15)};
    left: ${rem(21)};
`

const Img = styled(ImgBase)`
    height: ${rem(185)};
    width: 100%;
`

const Keeping = styled.span`
    position: absolute;
    top: calc(50% - ${rem(10)});
    left: ${rem(25)};

    font-size: ${rem(12)};
    line-height: ${rem(18)};
    color: ${color.white};
`

const Icon = styled.img`
    width: ${rem(30)};
    height: ${rem(30)};
`

const Category = styled.p`
    font-size: ${rem(12)};
    line-height: ${rem(42)};
    color: ${color.blue};
    text-transform: uppercase;
    margin: 0;
`

const TimeAdd = styled.span`
    color: ${color.grayDate};
    text-transform: none;
`

const Title = styled(Link)`
    font: ${rem(14)}/${rem(20)} ${font.stemReg};
    color: ${color.enter};
    text-decoration: none;

    cursor: pointer;
`

const Preview = styled(Link)`
    position: relative;

    display: block;

    &::before {
        content: '';

        position: absolute;
        top: 0;
        left: 0;

        display: block;
        width: 100%;
        height: 100%;

        background-color: rgba(0, 0, 0, .5);

        transition: background-color .5s;
    }

    &:hover::before {
        background-color: rgba(0, 0, 0, .3);
    }
`

function EnterOne({ data, className }) {
    if (!data) return null

    const video = data.video || {}

    return (
        <Group title="Из эфира" className={className}>
            <Root>
                <Preview to="#">
                    <Img src={video.preview} />
                    <TimeKeeping>
                        <Icon src={icon} alt="" role="presentation" />
                        <Keeping>
                            {`${video.duration}`.replace('.', ':')}
                        </Keeping>
                    </TimeKeeping>
                </Preview>
                <Info>
                    <Title to="#">
                        {data.title}
                    </Title>
                    <Category>
                        {data.program
                            ? data.program.name
                            : null
                        }
                        {` `}
                        <TimeAdd>
                            {Date.parse(data.publish_date)
                                ? <FormattedDate value={data.publish_date} month="long" day="2-digit" />
                                : null
                            }
                        </TimeAdd>
                    </Category>
                </Info>
            </Root>
        </Group>
    )
}

export default EnterOne
