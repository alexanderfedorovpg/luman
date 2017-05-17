import React, { Component } from 'react';
import styled from 'styled-components';

import {
    Left,
    Right,
    Bot,
} from 'components/Header';

import {
    Horizontal as FormHorizontal,
    InputIcon,
} from 'components/Form';

import Help from 'containers/Help';
import Button from 'components/Button';

import { padding, font } from 'constants/style';

const FormInput = styled(InputIcon)`
    margin-right: 7px;

    &:nth-child(1) {
        flex: 1;
        width: 55.182%;
    }

    &:nth-child(2) {
        width: 37.192%;
    }
`;

const HeaderBot = styled(Bot)`
    padding-left: 0;
`;

const HeaderLeft = styled(Left)`
    padding-left: ${padding};
    padding-right: 0;
`;

const HeaderRight = styled(Right)`
    width: 40.384%;
`;

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
`;

const Form = styled.form`
    width: 100%;
`;

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {

            },
        };
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(prop) {
        return (e) => {
            this.setState({
                form: {
                    ...this.state.form,
                    [prop]: e.target.value,
                },
            });
        };
    }

    render() {
        let { moved, onSearchChange } = this.props;

        return (
            <HeaderBot moved={moved}>
                <HeaderLeft>
                    <Form>
                        <FormHorizontal>
                            <FormInput
                                placeholder="Ключевые слова"
                                block
                                icon="search"
                                onChange={this.onChangeValue('keywords')}
                                value={this.state.form.keywords || ''}
                            />
                            <FormInput
                                placeholder="Агентство"
                                block
                                icon="search"
                                onChange={this.onChangeValue('agency')}
                                value={this.state.form.agency || ''}
                            />
                            <FormButton
                                success xs
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSearchChange(this.state.form);
                                }}
                            >
                                OK
                            </FormButton>
                        </FormHorizontal>
                    </Form>
                </HeaderLeft>
                <HeaderRight>
                    <Help />
                </HeaderRight>
            </HeaderBot>
        );
    }
}

export default Header;
