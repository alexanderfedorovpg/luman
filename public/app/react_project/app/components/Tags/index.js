import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Input } from '../Form';

import { ifProp, rem } from './../../utils/style';
import { font } from './../../constants/style';

const Root = styled.div`
    margin-top: 5px;
    margin-bottom: 6px;
`;

const Item = styled.div`
    display: inline-block;
    margin-right: 3px;
    margin-bottom: 15px;

    vertical-align: middle;

    &:last-child {
        margin-right: 0;
    }
`;

const CustomInput = styled(Input)`
    display: none
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    height: 24px;
    padding: 0 10px;

    font-family: ${font.helvetica};
    font-size: ${rem(14)};
    font-weight: 400;
    color: #666666;
    text-decoration: none;

    border: 1px solid #cccccc;

    border-radius: 15px;
    cursor: pointer;

    &:hover {
        background-color: #f1f1f1;
    }

    ${ifProp('checked')`
        color: #fff;
        border-color: #56647b;
        background-color: #56647b !important;
    `}
`;

class Tags extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            checked: (this.props.value || []).slice(0),
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                checked: (nextProps.value || []).slice(0),
            });
        }
    }

    handleChange(e) {
        const valueToNumber = parseInt(e.target.value, 10);
        const value = isNaN(valueToNumber) ? e.target.value : valueToNumber;
        const index = this.state.checked.indexOf(value);
        const cb = () => (this.props.onChange || (() => {}))(this.state.checked);

        if (this.props.type === 'radio') {
            this.setState({
                checked: [value],
            }, cb);

            return;
        }

        if (index === -1) {
            this.setState({
                checked: [
                    ...this.state.checked,
                    value,
                ],
            }, cb);
        } else {
            this.setState({
                checked: [
                    ...this.state.checked.slice(0, index),
                    ...this.state.checked.slice(index + 1),
                ],
            }, cb);
        }
    }

    render() {
        const { data, type } = this.props;
        const { checked } = this.state;

        return (
            <Root>
                {data.map((tag) => {
                    if (!tag) {
                        return null;
                    }

                    const id = tag.id ? tag.id : tag;
                    const name = tag.name ? tag.name : tag;

                    return (
                        <Item key={id}>
                            <Label checked={checked.indexOf(id) > -1}>
                                <CustomInput
                                    type={type}
                                    name="tags"
                                    value={id}
                                    checked={checked.indexOf(id) > -1}
                                    onChange={this.handleChange}
                                />

                                <span>
                                    {name}
                                </span>
                            </Label>
                        </Item>
                    );
                })}
            </Root>
        );
    }
}

Tags.defaultProps = {
    type: 'checkbox',
};

Tags.propTypes = {
    data: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
    ])).isRequired,
    type: PropTypes.oneOf(['checkbox', 'radio']),
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ])),
};

export default Tags;
