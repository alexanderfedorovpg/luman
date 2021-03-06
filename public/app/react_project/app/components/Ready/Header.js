import React, { PureComponent } from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { withRouter, Link } from 'react-router'

import {
    Left,
    Right,
    Bot
} from 'components/Header'
import Help from 'components/Help'
import Toggle from 'components/Toggle'
import { Root as TabsRoot, itemStyle } from 'components/Tabs'
import { InputIcon } from 'components/Form/Input'

const Tabs = styled(TabsRoot)`
    margin-right: 15px;
`
const TabsItem = styled(({ active, ...rest }) => <Link {...rest} />)`
    ${itemStyle}
`

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`

const CustomInput = styled(InputIcon)`
    width: 61.6%;
    margin-right: 28px;
`

class Header extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                search: '',
                order: props.filters[0].id
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOrderChange = this.handleOrderChange.bind(this)
        this.setFilters = debounce(() => {
            props.setFilters({
                searchString: this.state.data.search,
                orderBy: props.filters.find(v=>v.id == this.state.data.order).value
            })
        }, 500)
    }

    handleSubmit(e) {
        e.preventDefault()
    }

    handleChange(e) {
        this.setState({
            data: {
                ...this.state.data,
                search: e.target.value
            }
        }, this.setFilters)
    }

    handleOrderChange(item) {
        this.setState({
            data: {
                ...this.state.data,
                order: item.id
            }
        }, this.setFilters)
    }

    render() {
        let { filters, moved, router: { isActive } } = this.props

        return (
            <Bot moved={moved}>
                <Left>
                    <Tabs>
                        <TabsItem
                            to="/ready"
                            active={isActive('/ready', true)}>

                            Готовые
                        </TabsItem>
                        <TabsItem
                            to="/ready/published"
                            active={isActive('/ready/published')}>

                            Опубликованные
                        </TabsItem>
                    </Tabs>
                    <Form onSubmit={this.handleSubmit}>
                        <CustomInput
                            icon="search"
                            value={this.state.data.search}
                            onChange={this.handleChange}
                            placeholder="Поиск по готовым материалам" />
                        <Toggle
                            data={filters}
                            value={this.state.order}
                            onChange={this.handleOrderChange} />
                    </Form>
                </Left>
                <Right>
                    <Help />
                </Right>
            </Bot>
        )
    }
}

export default withRouter(Header)
