import React from 'react'
import styled from 'styled-components'
import { rem, below } from '../../utils/style'

import { InputBlock } from '../Input'
import { ButtonBlock } from '../Button'
import { ArrowRightLight } from '../SvgIcons'

import bgImage from './login-bg.png'
import pic from './login-pic.png'
import rtvi from './rtvi.png'

const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    background: url(${bgImage}) repeat;
`;

const Form = styled.form`
    display: flex;
    align-items: stretch;
    width: 787px;
`

const Pic = styled.div`
    width: ${rem(394)};
    position: relative;

    &:before {
        position: absolute;
        top: -14px;
        left: -16px;

        display: block;
        width: 160px;
        height: 77px;

        content: ' ';
        background: url(${rtvi}) no-repeat;
    }
`

const Image = styled.img`
    display: block;
    height: 100%;
    max-width: 100%;
    margin-left: auto;

    object-fit: cover;
`

const Inputs = styled.div`
    width: ${rem(394)};
    padding: ${rem(67)} ${rem(42)} ${rem(67)} ${rem(44)};

    background-color: #fff;
`

const FormGroup = styled.div`
    margin-bottom: 24px;

    &:last-child {
        margin-bottom: 0;
    }
`

const LoginButton = styled(ButtonBlock)`
    height: 33px;

    line-height: 33px;
    color: #fff;

    background-color: #690;
    border-color: #690;
`

function Login() {

    return (
        <Wrap>
            <Form method="POST" action="">
                <Pic>
                    <Image src={pic} alt="" role="presentation" />
                </Pic>
                <Inputs>
                    <FormGroup>
                        <InputBlock placeholder="login" type="name" />
                    </FormGroup>
                    <FormGroup>
                        <InputBlock placeholder="password" type="password" />
                    </FormGroup>
                    <FormGroup>
                        <LoginButton className="success">
                            <ArrowRightLight style={{ marginRight: '4px', opacity: .33 }} />
                            Войти
                        </LoginButton>
                    </FormGroup>
                </Inputs>
            </Form>
        </Wrap>
    )
}

export default Login
