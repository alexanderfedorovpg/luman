import React from 'react'
import styled from 'styled-components'

import { Bot as Root, Left as Wrapper } from '../Header'
import Tabs from '../Tabs'
import Icon from '../Icon'
import { InputIcon } from '../Form/Input'
import Button from '../Button'

import { rem } from 'utils/style'
import { font } from 'constants/style'

const Period = styled.form`
    display: flex;
    align-items: center;
    margin-left: ${rem(39)};
`

const Link = styled.a`
    margin-right: ${rem(15)};

    font-family: ${font.opensans};
    font-size: ${rem(16)};
    font-weight: 400;

    color: #000000;
    text-decoration: none;
    letter-spacing: -0.2px;
`

const Date = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-right: ${rem(11)};
        margin-left: ${rem(9)};

        font-family: ${font.opensans};
        font-size: ${rem(14)};
        font-weight: 400;
        color: #666666;
    }
`

const CustomInput = styled(InputIcon)`
    max-width: 117px;

    svg, i {
        opacity: .26
    }
    input {
        color: #ccc;
    }
`

const CustomButton = styled(Button)`
    height: 36px;
    padding-right: ${rem(8)};
    padding-left: ${rem(8)};
    margin-left: ${rem(11)};

    font-size: 12px;
    line-height: 36px;

    color: #b4b4b4;

    background-color: #f1f1f1;
`

function Header() {
    let filters = [
        {
            title: 'Сегодня'
        },
        {
            title: 'За неделю'
        },
        {
            title: 'За месяц'
        },
        {
            title: 'За год'
        }
    ]

    return (
        <Root>
            <Wrapper>
                {/*<Tabs data={filters} />
                <Period>
                    <Link href="#">Показать за период</Link>
                    <Date>
                        <CustomInput icon="calendar" right defaultValue="15.01.2017" />
                        <span> — </span>
                        <CustomInput icon="calendar" right defaultValue="15.01.2017" />
                    </Date>
                    <CustomButton xs success>OK</CustomButton>
                </Period>*/}
            </Wrapper>
        </Root>
    )
}

export default Header
