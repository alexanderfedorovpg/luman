import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

import MiniBase from '../Mini'
import Group from '../Group'

import { rem } from 'utils/style'
import { color, font } from 'constants/style'

const Root = styled.div`
    width: ${rem(300)};
    padding-left: ${rem(14)};
`

const Title = styled(Link)`
    font: ${rem(24)}/${rem(24)} ${font.stemReg};
    font-weight: 700;
    color: ${color.war};
    text-decoration: none;
`

const Live = styled.div`
    padding-left: ${rem(6)};

    background-color: ${color.war};

    margin-top: ${rem(13)};
    font: ${rem(16)}/${rem(23)} ${font.stemReg};
    font-weight: 700;
    color: ${color.white};
    text-transform: uppercase;
`

const Watch = styled(Link)`
    font: ${rem(14)} ${font.stemReg};
    font-weight: 700;
    color: ${color.blue};
    text-decoration: none;
`

const Wrapper = styled.div`
    padding-bottom: ${rem(18)};

    border-bottom: 1px solid ${color.gray};

    margin-top: ${rem(3)};
    margin-bottom: ${rem(6)};
`

const Mini = styled(MiniBase)`
    position: relative;

    padding-bottom: 0 !important;
    padding-left: ${rem(18)};

    border-bottom: none !important;

    &::before {
        content: '';

        position: absolute;
        top: calc(50% - ${rem(9)});
        left: 0;

        display: block;
        width: ${rem(11)};
        height: 1px;

        background-color: ${color.war};
    }

    &:not(:first-child) {
        padding-top: ${rem(14)};
    }

    .mini-news__title {
        display: inline-block;

        font-size: ${rem(14)};
        line-height: ${rem(19)};
    }
`

function Now({ data }) {
    if (!data) return null

    return (
        <Root>
            <Title to="#" className="now-war__title">
                {data.title}
            </Title>
            <Live>
                Live: Главное
            </Live>
            <Wrapper>
                {data.comments
                    .map(v => ({ ...v, title: v.body }))
                    .map((value, i) => (
                        <Mini data={value} key={i} />
                    ))
                }
            </Wrapper>
            <Watch to="#">
                Следить за онлайн-трансляцией
            </Watch>
        </Root>
    )
}

export default Now
