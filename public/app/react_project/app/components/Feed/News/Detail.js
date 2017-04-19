import React from 'react'
import styled from 'styled-components'
import { FormattedTime, FormattedRelative } from 'react-intl'

import Button from 'components/Button'
import Icon from 'components/Icon'
import H2 from 'components/H2'
import H3 from 'components/H3'

import { padding, font, color } from 'constants/style'

const Root = styled.div`
    position: relative;
    max-width: 536px;
    height: 100%;

    margin: auto;
    border-radius: 4px;
    border: 1px solid #ccc;

    background-color: #fff;
`

const ScrollWrapper = styled.div`
    padding-top: 27px;
    padding-bottom: 41px;
    padding-left: ${padding};
    padding-right: ${padding};
    height: 100%;

    overflow-y: auto;
`

const Header = styled.header`
    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    color: #999999;
`

const Source = styled.a`
    margin-left: 11px;

    color: ${color.primary};
    text-decoration: none;
`

const Title = styled(H2)`
    margin-top: 16px;
`

const Text = styled.div`
    color: #666666;
    font-size: 14px;
    line-height: 18px;

    p {
        margin-bottom: 19px;
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    margin-top: 40px;
`

const IgnoreBtn = styled(Button)`
    height: 40px;
    line-height: 42px;
    margin-right: 3px;
`

const WorkBtn = styled(Button)`
    height: 40px;
    line-height: 42px;
`

const CustomIcon = styled(Icon)`
    margin-top: -3px;
    margin-right: 4px;
`

const CloseIcon = styled(Icon)`
    position: absolute;
    top: 14px;
    right: 14px;
`

function Detail({ data, onClose, toWork, ignore }) {

    let date = data.anons_create_dt

    return (
        <Root>
            <ScrollWrapper>
                <Header>
                    <time dateTime={date}>
                        <FormattedRelative value={date} units="day" />
                        {', '}
                        <FormattedTime value={date} />
                    </time>
                    <Source href="#">Источник: {data.source_feed}</Source>
                </Header>
                <Title>{data.header}</Title>
                <H3></H3>
                <Text>
                    {data.body}
                </Text>
                <ButtonsContainer>
                    <IgnoreBtn
                        onClick={e => {
                            ignore(data.id)
                            onClose()
                        }}
                        danger
                        block >

                        <CustomIcon type="delete-reverse" />
                        Игнорировать
                    </IgnoreBtn>
                    <WorkBtn
                        onClick={e => {
                            toWork(data.id)
                            onClose()
                        }}
                        success
                        block>

                        <CustomIcon type="arrow-right" />
                        В работу
                    </WorkBtn>
                </ButtonsContainer>
                <CloseIcon type="delete-lg" onClick={onClose} />
            </ScrollWrapper>
        </Root>
    )
}

export default Detail
