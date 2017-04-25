import React from 'react';
import styled from 'styled-components';

import Icon from 'components/Icon'

import { font } from 'constants/style';
import { rem, ifProp } from 'utils/style';

import Item from './Item';

const Root = styled.div`
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-bottom: 0.3125rem;
    border: 2px solid #00a5b8;
`

const Header = styled.p`
    position: relative;
    padding-right: 1.875rem;
    padding-left: 1.125rem;
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    color: #000;
    text-transform: uppercase;
    cursor: pointer;
`

const Title = styled.span`

`

const Wrap = styled.div`
    display: none;
    .is-active & {
        display: block
    }
`;
const Content = styled.div``;

const DropdownIcon = styled(Icon)`
    position: absolute;
    top: 4px;
    right: 13px;
    transition: transform .3s ease;
    .is-active & {
        transform: rotate(180deg);
    }
`


class CollapseItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            class: ''
        };
        this.toggle = ::this.toggle; // like this.toggle.bind(this) In ES7+ (ES2016) https://github.com/tc39/proposal-bind-operator
    }

    componentDidMount() {
        if (this.props.opened) {
            this.setState({
                open: true,
                class: 'is-active'
            })
        }
    }

    toggle() {
        let result = !this.state.open ? 'is-active' : '';
        this.setState({
            open: !this.state.open,
            class: result
        });
    }

    render() {
        return (
            <Root className={this.state.class}>
                <Header onClick={this.toggle}>
                    <Title>{this.props.title}</Title>
                    <DropdownIcon type="dropdown-arrow" />
                </Header>
                <Wrap>
                    <Content>
                        <Item />
                    </Content>
                </Wrap>
            </Root>
        )
    }

}

export default CollapseItem;
