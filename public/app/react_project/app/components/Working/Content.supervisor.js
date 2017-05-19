import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import randomString from 'random-string'


import Modal from 'components/Modal'

import Item from './Item.supervisor'

import Button from 'components/Button'
import Icon from 'components/Icon'

const animationClassName = randomString()

injectGlobal`
    .${animationClassName}-leave {
        max-height: 500px;
        opacity: 1;
    }

    .${animationClassName}-leave-active {
        opacity: 0.01;
        max-height: 0px;
        transition: all .5s;
    }
`

const Root = styled.div`
    width: 100%;
    margin-top: -15px;
`

const ModalRoot = styled.div`
    max-width: 536px;
    padding: 32px 26px 27px 23px;
    background: #fff;
    box-shadow: 1px 1px 9px rgba(0, 0, 0, 0.37);
`

const ModalText = styled.p`
    font-size: 16px;
    font-weight: bold;
    line-height: 22px;
    color: #333333;
    letter-spacing: -0.3px;
`

const ModalTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 24px;
    font-weight: 600;
    letter-spacing: -0.5px;
`

const ButtonsWrap = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-top: 25px;

    Button:first-child {
        margin-right: 3px;
    }

`

const ModalClose = styled.a`
    position: absolute;
    top: 14px;
    right: 14px;
    cursor: pointer;
`

const CancelButton = styled(Button)`

`

function Content({ news, push, old, clearTask, deleteTask, postMessage, toggle, open }) {

    return (
        <Root>
            <ReactCSSTransitionGroup
                transitionName={animationClassName}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>

                {news.map(value => (
                    <Item
                        key={value.id}
                        push={push}
                        data={value}
                        clearTask={clearTask}
                        postMessage={postMessage}
                        newItem={old.indexOf(value.id) == -1} 
                        toggle={toggle}
                        open={open}/>
                ))}
                <Modal
                    isOpen={open}
                    contentLabel="Удалить задание"
                    onRequestClose={toggle}>
                    <ModalRoot>
                        <ModalTitle>Внимание: удаление!</ModalTitle>
                        <ModalText>Вы уверены, что хотите удалить задание?</ModalText>
                        <ButtonsWrap>
                            <Button md danger onClick={toggle}>
                                <Icon type="delete-bold"/>
                                Отменить
                            </Button>
                            <Button md success onClick={(e) => {
                                    deleteTask();
                                    toggle();
                                }}>
                                <Icon type="arrow-right"/>
                                Подтвердить
                            </Button>
                        </ButtonsWrap>
                        <ModalClose onClick={() => toggle()}>
                            <Icon type="delete-bold"/>
                        </ModalClose>
                    </ModalRoot>
                </Modal>
            </ReactCSSTransitionGroup>
        </Root>
    )
}

export default Content


/*  
<Modal
    isOpen={open}
    contentLabel="Удалить задание"
    onRequestClose={toggle}>
    <div>
        <button>Удалить</button>
    </div>
</Modal>
*/