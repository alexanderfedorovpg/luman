import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Item from './Item'

const Root = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 29px;
`

class Rating extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: props.value || null
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.checked !== nextProps.value) {
            this.setState({
                checked: nextProps.value
            })
        }
    }

    handleChange(e) {
        let value = +e.target.value

        if (value !== this.state.checked) {
            this.setState({
                checked: value
            })

            this.props.onChange(value)
        }
    }

    render() {
        let { checked } = this.state

        return (
            <Root className={this.props.className}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(rating => {
                    return (
                        <Item
                            key={rating}
                            {...{ rating, checked }}
                            onChange={this.handleChange} />
                    )
                })}
            </Root>
        )
    }
}

Rating.PropTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
};

export default Rating
