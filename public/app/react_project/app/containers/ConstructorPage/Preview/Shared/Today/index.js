import React from 'react'
import styled from 'styled-components'

import SectionTitle from '../SectionTitle'
import Block from '../Block'

import { rem } from 'utils/style'

const Root = styled.div``

const Title = styled(SectionTitle)`
    line-height: ${rem(32)};

    border-bottom: none;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-top: ${rem(17)};
`

function Today({ data, className, war }) {
    const first = data[0]
    const rest = data.slice(1, 3)

    return (
        <Root>
            {!war && (
                <Title>
                    Главное за последние сутки
                </Title>
            )}
            <Block data={first} rectangle />
            <Wrapper>
                {rest.map(v=> (
                    <Block key={v.id} data={v} warTitle={war && first.title} />
                ))}
            </Wrapper>
        </Root>
    )
}

export default Today
