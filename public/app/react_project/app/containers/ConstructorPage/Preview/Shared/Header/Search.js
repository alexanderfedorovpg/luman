import React from 'react'
import styled from 'styled-components'

import IconBase from 'components/Icon'

import { rem } from 'utils/style'

const Root = styled.div`
    width: 100%;
    // height: ${rem(33)};
    margin-left: ${rem(20)};

    color: rgba(255, 255, 255, .42);
`

const Form = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const Input = styled.input`
    // height: ${rem(33)};

    color: rgba(255, 255, 255, .42);

    text-align: right;
    font-size: 13px;

    border: none;
    background-color: transparent;
    outline: none;

    transition: flex 0.3s ease, background 0.3s ease;

    &::-webkit-search-cancel-button {
        display: none;
    }

    &::-ms-clear {
        display: none;
    }
`

const Wrapper = styled.div`
    position: relative;

    width: ${rem(17)};
    height: ${rem(17)};
    margin-top: ${rem(4)};
    margin-left: ${rem(10)};
`

const Button = styled.button`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;

    width: ${rem(17)};
    height: ${rem(17)};

    font-size: 0;

    cursor: pointer;
    border: none;
    background-color: transparent;
    background-size: cover;
`

const Icon = styled(IconBase)`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;

    width: ${rem(17)};
    height: ${rem(17)};
`

function Search() {

    return (
        <Root>
            <Form>
                <Input placeholder="Поиск по сайту" />
                <Wrapper>
                    <Button>
                        <Icon type="search" />
                    </Button>
                </Wrapper>
            </Form>
        </Root>
    )
}

export default Search
