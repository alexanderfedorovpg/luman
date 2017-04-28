import React from 'react';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';

import Icon from 'components/Icon'
import Article from './Article'

import { font } from 'constants/style';
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

const NotFound = styled.div`
    padding-right: ${rem(35)};
    padding-left: ${rem(18)};
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
        isOver: React.PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }

        this.toggle = ::this.toggle
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

    render() {
        let { data, choose, onRemove, category, connectDropTarget, isOver } = this.props

        return connectDropTarget(
            <div onClick={() => choose(category.id)}>
                <Root className={this.state.open ? 'is-active' : ''}>
                    <Header onClick={this.toggle}>
                        <Title>{category.name}</Title>
                        <DropdownIcon type="dropdown-arrow" />
                    </Header>
                    <Wrap>
                        <Content>
                            {data.map(value => (
                                <Article
                                    key={value.id}
                                    onRemove={onRemove}
                                    data={value} />
                            ))}
                            {data.length
                                ? null
                                : <NotFound>Ничего не найдено</NotFound>
                            }
                        </Content>
                    </Wrap>
                </Root>
            </div>
        )
    }
}

const spec = {
    drop(props, monitor) {

        return {
            category: props.category.id
        }
    }
}

const DropDecarator = DropTarget('newsItem', spec, function (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
});

export default DropDecarator(CollapseItem)
