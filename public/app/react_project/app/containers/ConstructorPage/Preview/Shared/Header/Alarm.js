import React from 'react'
import styled from 'styled-components'

import { rem } from 'utils/style'
import { color, font } from 'constants/style'

const Root = styled.span`
    position: absolute;
    top: 0;
    left: 0;

    display: block;
    width: 100%;
    height: ${rem(70)};

    text-decoration: none;

    cursor: pointer;
`

const Wrapper = styled.span`
    display: flex;
    flex-direction: row;
    padding-top: ${rem(0)};
    padding-bottom: ${rem(0)};
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    min-height: inherit;
`

const When = styled.span`
    font-size: ${rem(18)};
    line-height: ${rem(40)};
    color: ${color.white};
    margin-right: ${rem(17)};
`

const Event = styled.span`
    font: ${rem(24)} / ${rem(40)} ${font.stemReg};
    font-weight: 700;
    color: ${color.white};
`

function Alarm({ data }) {

    return (
        <Root>
            <Wrapper>
                <When>
                    Сегодня
                </When>
                <Event>
                    {data}
                </Event>
            </Wrapper>
        </Root>
    )
}

export default Alarm
