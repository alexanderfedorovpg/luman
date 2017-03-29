import React from 'react'
import styled from 'styled-components'

import Content, { Wrap, Left, Right } from './../Content'
import {
    Left as HeaderLeft,
    Right as HeaderRight,
    Link as HeaderLink
} from './../Header'
import { Search } from './../Icon'
import Button from './../Button'
import {
    Horizontal as FormHorizontal,
    InputIconWrapper,
    Input,
    IconWrapper
} from './../Form'

import { padding, font } from './../../constants/style'

const Header = styled.div`
    position: fixed;
    z-index: 9;
    top: 60px;
    right: 0;
    left: 67px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding-right: ${padding};
    padding-left: ${padding};

    background-color: #f0f0f0;
`

const Form = styled.form`

    .btn {
        opacity: 0.5;
        color: #666666;
        font-family: $opensans;
        font-size: 13px;
        line-height: 36px;
        font-weight: 700;
        &:hover {
            color: #fff;
            opacity: 1;
        }
    }
`

const FormInput = styled(InputIconWrapper)`
    margin-right: 7px;

    &:nth-child(1) {
        flex: 1;
        width: 55.182%;
    }

    &:nth-child(2) {
        width: 37.192%;
    }
`

const SearchIcon = IconWrapper(Search)

const FormButton = styled(Button)`
    opacity: 0.5;
    color: #666666;
    font-family: ${font.opensans};
    font-size: 13px;
    line-height: 36px;
    font-weight: 700;
    &:hover {
        color: #fff;
        opacity: 1;
    }
`

function Feed() {
    return (
        <Content>
            <Header>
                <HeaderLeft>
                    <Form>
                        <FormHorizontal>
                            <FormInput>
                                <Input type="text" placeholder="Ключевые слова" block icon />
                                <SearchIcon />
                            </FormInput>
                            <FormInput>
                                <Input type="text" placeholder="Агенство" block icon />
                                <SearchIcon />
                            </FormInput>
                            <FormButton className="success" xs>OK</FormButton>
                        </FormHorizontal>
                    </Form>
                </HeaderLeft>
                <HeaderRight>
                    <HeaderLink>
                        <span>?</span>
                        Справка
                    </HeaderLink>
                </HeaderRight>
            </Header>
            <Wrap>
                <Left>
                    Feed
                </Left>
                <Right>
                </Right>
            </Wrap>
        </Content>
    )
}

export default Feed

// +b.header-l
//             +b.FORM.form-feed(action='' method='POST')
//                 .form-horizontal
//                     +e.input.input-icon
//                         input.input.input-block#ko4(type='text' placeholder='Ключевые слова')
//                         +icon({ icon: 'search', class: 'search' })
//                     +e.input.input-icon
//                         input.input.input-block#ko4(type='text' placeholder='Агенство')
//                         +icon({ icon: 'search', class: 'search' })
//                     button.btn.btn-xs.btn-success ОК
//         +b.header-r
//             a.header-link(href=jv0)
//                 span ?
//                 | справка
