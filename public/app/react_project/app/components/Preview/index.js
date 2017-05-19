import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { FormattedTime, FormattedRelative } from 'react-intl'

import H2 from 'components/H2'
import Button from 'components/Button'
import Icon from 'components/Icon'
import Modal from 'components/Modal'
import Select from 'components/Editor/Select'

import Delegate from 'components/Delegate';

import { padding, font } from 'constants/style'
import { ensureAbs } from 'utils/uri'

const Root = styled.div`
    max-width: 908px;
    padding: 30px ${padding} 79px;
    margin: auto;
    font-family: ${font.opensans};

    background-color: #fff;

    height: 100%;
    overflow-y: auto;
`

const Header = styled.header`
    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    color: #999;
`

const Title = styled.h1`
    margin-top: 9px;
    margin-bottom: 23px;

    font-size: 24px;
    font-weight: 400;
    font-weight: 600;

    color: #333333;
    letter-spacing: -0.15px;
`

const ImageWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    :first-child {
        flex-shrink: 0;
        margin-right: ${padding};
    }
`

const Img = styled.div`
    margin-bottom: 5px;

    img {
        display: block;

        max-width: 100%;
        height: auto;

    }
`

const Source = styled.span`
    margin-left: 2px;

    font-family: ${font.opensans};
    font-size: 12px;
    font-weight: 400;

    color: #999;
`

const Subtitle = styled(H2)`
    padding-right: 19px;

    margin-top: 0px;
    margin-left: 2px;

    font-size: 16px;
    font-weight: 600;
    line-height: 22px;

    color: #333333;
    letter-spacing: 0.05px;
`

const Content = styled.div`
    padding-top: 19px;
    padding-right: ${padding};

    padding-left: 93px;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #666;

    p {
        margin-top: 0;
    }
`

const Btns = styled.div`
    display: flex;
    margin-top: 19px;
`

const CustomButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-right: 12px;

    &:last-child {
        margin-right: 0;
    }
`

const CloseButton = styled(Icon)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
`

class Preview extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }

        this.open = ::this.open
        this.close = ::this.close
    }

    open() {
        this.setState({
            modalOpen: true
        })
    }

    close() {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        const { data, users, onClose, delegate, done, doneTitle } = this.props
        const createDate = data.created_at

        return (
            <Root>
                <CloseButton type="delete-lg" onClick={onClose} />
                <Header>
                    {createDate
                        ? (
                            <time>
                                <FormattedRelative value={createDate} units="day" />
                                {', '}
                                <FormattedTime value={createDate} />
                            </time>
                        )
                        : null
                    }
                </Header>
                <Title>
                    {data.title}
                </Title>
                <ImageWrapper>
                    <div>
                        <Img>
                            <img src={ensureAbs(data.image_main)} />
                        </Img>
                        <Source>
                            Источник: Интерфакс
                        </Source>
                    </div>
                    <div>
                        <Subtitle>
                            {data.subtitle}
                        </Subtitle>
                    </div>
                </ImageWrapper>
                <Content>
                    <div dangerouslySetInnerHTML={{ __html: data.body }} />
                    <Btns>
                        <CustomButton primary onClick={this.open}>
                            <Icon type="arrow-left" />
                            Передать другому
                        </CustomButton>
                        <CustomButton success onClick={e=> {
                                done(data.id)
                                onClose()
                            }}>
                            <Icon type="arrow-right" />
                            {doneTitle || 'Опубликовать'}
                        </CustomButton>
                    </Btns>
                </Content>
                <Delegate
                    onClose={this.close}
                    isOpen={this.state.modalOpen}
                    onChange={value => (
                        delegate({ id: data.id, new_editor_id: value.id })
                    )}
                    users={users}
                    value={data.editor} />
            </Root>
        )
    }
}

export default Preview
