import React, { PureComponent } from 'react'
import styled from 'styled-components'

import Modal from 'components/Modal'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Gallery from './Gallery'
import Tags from 'components/Tags/Static'
import gradient from './img/text-opacity.png'

import {
    Group,
    Textarea,
    Horizontal,
    Input,
    Checkbox
} from 'components/Form'
import {
    Link as HeaderLink,
} from 'components/Header'

import { padding, font } from 'constants/style'

const Root = styled.div`
    max-width: 749px;
    height: 100%;
    overflow-y: auto;
    padding: ${padding};

    margin: auto;
    border-radius: 4px;
    border: 1px solid #ccc;

    background-color: #fff;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 46px;
`

const Link = styled.a`
    font-family: ${font.opensans};
    font-size: 13px;
    font-weight: 700;
    color: #000000;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    span {
        margin-right: 3px;

        font-family: ${font.helvetica};
        font-size: 18px;
    }
`

const CustomTextarea = styled(Textarea)`
    resize: vertical;
`

const CustomCheckbox = styled(Checkbox)`
    margin-right: 20px;
`

const CustomGallery = styled(Gallery)`
    margin-top: 40px;
    margin-bottom: 35px;
`

const Text = styled.p`
    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 24px;

    position: relative;

    &:after {
        content: ' ';
        position: absolute;
        bottom: -23px;
        left: 0;
        right: 0;

        height: 124px;
        width: 100%;

        background-image: url(${gradient});
        background-repeat: repeat-x;
        background-position: bottom left;
    }
`

let dataTags = [
    'Биография',
    'Журналистская работа',
    'Политическая карьера',
    'Личная жизнь'
]

let dataGallery = [
    '/img/help1.png',
    '/img/help2.png',
    '/img/help3.png',
    '/img/help4.png',
    '/img/help5.png'
]

class Help extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    handleSubmit(e) {
        return e => {
            e.preventDefault()

            if (e.target.query.value) {

                cb(e.target.query.value)
            }
        }
    }

    open() {
        if (!this.state.open) {
            this.setState({
                open: true
            })
        }
    }

    close() {
        if (this.state.open) {
            this.setState({
                open: false
            })
        }
    }

    render() {
        let { getPage, getLinks } = this.props

        return (
            <div>
                <HeaderLink onClick={this.open}>
                    <span>?</span>
                    Справка
                </HeaderLink>
                <Modal
                    isOpen={this.state.open}
                    contentLabel="Справка"
                    onRequestClose={this.close}>

                    <Root>
                        <Header>
                            <Link>
                                <span>?</span>
                                Справка
                            </Link>
                            <Icon type="delete-lg" onClick={this.close} />
                        </Header>
                        <form onSubmit={this.handleSubmit(getLinks)}>
                            <Group>
                                <CustomTextarea
                                    name="query"
                                    placeholder="Поисковый запрос"
                                    light block />
                            </Group>
                            <Group>
                                <Button block success>Поиск</Button>
                            </Group>
                        </form>
                    </Root>
                </Modal>
            </div>
        )
    }
}

export default Help
