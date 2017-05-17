import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ClickOutside from 'react-click-outside';

import Icon from 'components/Icon';
import { InputIcon } from 'components/Form/Input';

import { ifProp } from 'utils/style';
import { font } from 'constants/style';

const Root = styled.div`
    position: relative;
`;

const Options = styled.div`
    position: absolute;
    z-index: 8;
    top: 100%;
    left: 0;
    right: 0;
    display: none;

    background-color: #fff;

    ${ifProp('open')`
        display: block
    `}
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 3px 19px 5px 2px;

    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;

        span {
            display: block;
        }

        p {
            color: #333333;
            font-weight: 600;
        }

    }
`;

const Pic = styled.div`
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    text-align: center;
    margin-right: 11px;

    img {
        border-radius: 50%;
        max-width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Text = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    ${ifProp('noPic')`
        padding-left: 11px;
    `}

    p {
        margin: 0;

        font-family: ${font.opensans};
        font-size: 14px;
        color: #666666;
        font-weight: 400;
    }

    span {
        display: none;

        color: #999999;
        font-family: ${font.opensans};
        font-size: 12px;
        font-weight: 300;
    }
`;

class Select extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            placeholder: '',
            value: props.value || {
                name: '',
                id: '',
            },
        };

        this.open = ::this.open;
        this.close = ::this.close;
        this.changeHandler = ::this.changeHandler;
    }

    open() {
        if (!this.state.open) {
            this.setState({
                ...this.state,
                open: true,
            });
        }
    }

    close() {
        if (this.state.open) {
            this.setState({
                ...this.state,
                open: false,
            });
        }
    }

    handleClickOutside() {
        this.close();
    }

    selectHandler(item) {
        this.setState({
            ...this.state,
            value: item,
            placeholder: item.name,
            open: false
        });

        (this.props.onChange || (() => {}))(item);
    }

    changeHandler(e) {
        this.setState({
            ...this.state,
            placeholder: e.target.value
        })
    }

    render() {
        const { icon, options, error } = this.props;
        const { placeholder } = this.state;
        const filteredOptions = options.filter(option => (
            option.name.toLowerCase().indexOf(placeholder.toLowerCase()) > -1)
        )

        return (
            <Root className={this.props.className} onClick={this.open}>
                <InputIcon
                    onChange={this.changeHandler}
                    icon={icon}
                    value={placeholder}
                    error={error}
                    block
                />
                <input
                    type="hidden"
                    name={this.props.name}
                    value={this.state.value.id}
                />

                <Options open={this.state.open}>
                    {filteredOptions
                        .map((option, index) => (
                            <Item
                                key={index}
                                onClick={this.selectHandler.bind(this, option)}>

                                {
                                    !!option.avatar &&
                                    <Pic>
                                        <img src={option.avatar.url} alt={option.name} />
                                    </Pic>
                                }
                                <Text noPic={!option.pic}>
                                    <p>{option.name}</p>
                                    <span>Выбрать</span>
                                </Text>
                            </Item>
                        ))
                    }
                </Options>
            </Root>
        );
    }
}

Select.propTypes = {
    onChange: PropTypes.func,
    icon: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
};

export default ClickOutside(Select);
