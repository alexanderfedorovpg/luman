import React from 'react';
import styled from 'styled-components';

import Icon from 'components/Icon'
import Article from './Article'
import NotFound from './NotFound'

import { font, padding } from 'constants/style';
import { rem, ifProp } from 'utils/style';

const Root = styled.div`
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-bottom: 0.3125rem;
    border: 2px solid #00a5b8;

    .war-mode & {
        border-color: #c00;
    }
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

const Content = styled.div``

const Placeholder = styled.div`
    width: 100%;
    border: 1px solid;
`

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

    static propTypes = {
    }

    constructor(props) {
        super(props);

        this.state = {
            open: true,

            // placeholder index
            placeholder: -1
        }

        this.toggle = ::this.toggle
        this.setPlaceholder = ::this.setPlaceholder
        this.onMove = ::this.onMove
        this.byIndex = ::this.byIndex
    }

    componentDidMount() {
        if (this.props.opened) {
            this.setState({
                open: true
            })
        }
    }

    toggle() {
        this.setState({
            open: !this.state.open
        })
    }

    setPlaceholder(index) {
        this.setState({
            placeholder: index
        })
    }

    byIndex(index) {
        return this.props.data[index]
    }

    onMove(index) {
        const { placeholder } = this.state
        const { onMove, data } = this.props

        if (index != placeholder && index != (placeholder-1)) {
            onMove(data[index].id, (data[placeholder]||{}).id)
        }
    }

    renderList() {
        let { data, onRemove, category } = this.props

        return data.map((value, index) => (
            <Article
                key={value.id}
                index={index}
                category={category.id}
                byIndex={this.byIndex}
                onMove={this.setPlaceholder}
                onChange={this.onMove}
                onRemove={onRemove}
                data={value} />
        ))
    }

    render() {
        let {
            data,
            choose,
            category
        } = this.props

        let items = this.renderList()

        if (this.state.placeholder > -1) {
            items.splice(
                this.state.placeholder,
                0,
                <Placeholder key={null} />
            )
        }

        return (
            <Root
                className={this.state.open ? 'is-active' : ''}
                onClick={() => choose(category.id)}>

                <Header onClick={this.toggle}>
                    <Title>{category.name}</Title>
                    <DropdownIcon type="dropdown-arrow" />
                </Header>
                <Wrap>
                    <Content>
                        {items}
                        {data.length
                            ? null
                            : <NotFound category={category.id} />
                        }
                    </Content>
                </Wrap>
            </Root>
        )
    }
}

export default CollapseItem
