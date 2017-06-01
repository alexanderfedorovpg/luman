import React from 'react'
import styled from 'styled-components'

import { rem } from 'utils/style'
import { font, color } from 'constants/style'
import image from './where-view.png'

const Root = styled.div`
    padding-top: ${rem(31)};
    padding-bottom: ${rem(31)});
    width: ${rem(932)};
    height: ${rem(99)};

    text-align: center;

    background-image: url(${image});
    background-position: center;
    background-size: cover;
`

const Title = styled.div`
    font: ${rem(24)}/${rem(26)} ${font.stemReg};
    font-weight: 700;
    color: ${color.white};
    text-transform: uppercase;
`

const Subtitle = styled.div`
    font-size: ${rem(14)};
    line-height: ${rem(26)};
    color: ${color.grayDirty};
    text-transform: uppercase;
`

function Banner({ className }) {

    return (
        <Root className={className}>
            <Title>
                Как смотреть RTVI
            </Title>
            <Subtitle>
                По обе стороны
            </Subtitle>
        </Root>
    )
}

export default Banner
