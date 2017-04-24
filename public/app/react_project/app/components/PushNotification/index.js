import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'

import User from 'components/User'
import Input from 'components/Form/Input'
import Icon from 'components/Icon'
import Button from 'components/Button'
import Modal from 'components/Modal'

import { padding, font, color } from 'constants/style'

const Root = styled.form`
    max-width: 536px;
    padding-top: 28px;
    padding-right: 26px;
    padding-bottom: 29px;
    padding-left: ${padding};
    margin: auto;

    background-color: #ffffff;

    box-shadow: 1px 1px 9px rgba(0, 0, 0, 0.37);
`

const CloseIcon = styled(Icon)`
    float: right;
`

const CustomUser = styled(User)`
    margin-bottom: 30px;
`

const CustomButton = styled(Button)`
    margin-top: 30px;

    font-family: ${font.opensans};
    font-size: 13px;
    font-weight: 700;
    line-height: 33px;
    color: #fff;

    border-color: ${color.danger};
    background-color: ${color.danger};
`

class PushNotification extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    closeModal() {
        this.setState({
            open: false
        })
    }

    openModal() {
        this.setState({
            open: true
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (e.target.text.value) {
            (this.props.send||(()=>{}))({ message: e.target.text.value })
            this.closeModal()
        }
    }

    render() {
        let { user, children, className, handleSend } = this.props

        return (
            <span className={className} onClick={this.openModal}>
                <Modal
                    isOpen={this.state.open}
                    contentLabel="Уведомление"
                    onRequestClose={this.closeModal}>

                    <Root onSubmit={this.handleSubmit}>
                        <CloseIcon type="delete-lg" onClick={this.closeModal} />
                        <CustomUser data={user} />
                        <Input block name="text" placeholder="Текст" />
                        <CustomButton block danger>
                            Отправить
                        </CustomButton>
                    </Root>
                </Modal>
                {children}
            </span>
        )
    }
}

PushNotification.propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    send: PropTypes.func
}

export default PushNotification
