import React, { Component } from 'react'
import styled from 'styled-components'
import { rem, below } from '../../utils/style'
import { color } from '../../constants/style'

import { Input } from '../Form'
import Button from '../Button'
import Icon from '../Icon'

import bgImage from './login-bg.png'
import pic from './login-pic.png'
import rtvi from './rtvi.png'

const Wrap = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99999999;

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

    ${below('860px')`
        flex-direction: column;
        align-items: center;
    `}
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

    ${below('400px')`
        width: 100%
    `}
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

    ${below('400px')`
        width: 100%
    `}
`

const FormGroup = styled.div`
    margin-bottom: 24px;

    &:last-child {
        margin-bottom: 0;
    }
`

const LoginButton = styled(Button)`
    height: 33px;

    line-height: 33px;
    color: #fff;

    background-color: ${color.success};
    border-color: ${color.success};
`

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                username: '',
                password: ''
            },

            error: {

            }
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler(prop) {
        return e => {
            this.setState({
                data: {
                    ...this.state.data,
                    [prop]: e.target.value
                }
            })
        }
    }

    onSubmitHandler(e) {
        e.preventDefault()

        let { data } = this.state

        if (!data.username || !data.password) {
            this.setState({
                error: {
                    username: !data.username,
                    password: !data.password
                }
            })

            return
        }

        this.props.onLogin(
            data.username,
            data.password
        )
    }

    render() {

        return (
            <Wrap>
                <Form onSubmit={this.onSubmitHandler}>
                    <Pic>
                        <Image src={pic} alt="" role="presentation" />
                    </Pic>
                    <Inputs>
                        <FormGroup>
                            <Input
                                onChange={this.onChangeHandler('username')}
                                value={this.state.data.username}
                                error={this.state.error.username}
                                placeholder="login"
                                block />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                onChange={this.onChangeHandler('password')}
                                value={this.state.data.password}
                                error={this.state.error.password}
                                placeholder="password"
                                type="password"
                                block />
                        </FormGroup>
                        <FormGroup>
                            <LoginButton success block>
                                <Icon type="arrow-right-light" style={{ marginTop: '-3px', opacity: .33,  marginRight: '4px', }} />
                                Войти
                            </LoginButton>
                        </FormGroup>
                    </Inputs>
                </Form>
            </Wrap>
        )
    }
}

export default Login
