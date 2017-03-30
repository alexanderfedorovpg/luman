import React from 'react'
import styled from 'styled-components'

import { Wrap, Left, Right } from './../Content'
import News from './../News'
import {
    Left as HeaderLeft,
    Right as HeaderRight,
    Link as HeaderLink,
    Bot as Header
} from './../Header'
import Icon from './../Icon'
import Button from './../Button'
import {
    Horizontal as FormHorizontal,
    Input,
    InputIcon,
    Group,
    Textarea,
    Label,
    Select
} from './../Form'

import { padding, font } from './../../constants/style'

const FormInput = styled(InputIcon)`
    margin-right: 7px;

    &:nth-child(1) {
        flex: 1;
        width: 55.182%;
    }

    &:nth-child(2) {
        width: 37.192%;
    }
`

// const SearchIcon = IconWrapper(Search)

const FormButton = styled(Button)`
    opacity: 0.5;
    color: #666666;
    font-family: ${font.opensans};
    font-size: 13px;
    line-height: 36px;
    font-weight: 700;
    &:hover {
        color: #fff;
        opacity: 1;
    }
`

const dataNews = [
    {
        id: 1,
        title: 'Песков: Москва уже «серьёзно устала» от обвинений в хакерских атаках'
    },
    {
        id: 2,
        title: 'Смертник на грузовике въехал в здание полиции в Египте'
    },
    {
        id: 3,
        title: 'Кремль заявил о «серьезной усталости» от обвинений в кибератаках'
    },
    {
        id: 4,
        title: 'В Кремле прокомментировали антитабачную концепцию Минздрава'
    },
    {
        id: 5,
        title: 'Сын вице-президента "Лукойла" снова развлекается за рулем'
    },
    {
        id: 6,
        title: 'Ученые: два небесных объекта летят в сторону Земли'
    }
]

const dataUsers = [
    {
        name: 'Ковалев Максим',
        pic: '/img/user1.png'
    },
    {
        name: 'Короленко Анастасия',
        pic: '/img/user2.png'
    }
]

function Feed() {
    return (
        <div>
            <Header>
                <HeaderLeft>
                    <form>
                        <FormHorizontal>
                            <FormInput placeholder="Ключевые слова" block icon="search" />
                            <FormInput placeholder="Агенство" block icon="search" />
                            <FormButton success xs>OK</FormButton>
                        </FormHorizontal>
                    </form>
                </HeaderLeft>
                <HeaderRight>
                    <HeaderLink>
                        <span>?</span>
                        Справка
                    </HeaderLink>
                </HeaderRight>
            </Header>
            <Wrap>
                <Left>
                    <News data={dataNews} />
                </Left>
                <Right>
                    <form>
                        <Group>
                            <Textarea block defaultValue="Кремль заявил о «серьезной усталости» от обвинений в кибератаках" />
                        </Group>
                        <Group sm>
                            <Label bold for="ko2">Назначить редактора статьи</Label>
                            <Select id="ko2" icon="search" options={dataUsers} />
                        </Group>
                        <Group sm>
                            <Label bold for="ko3">Назначить редактора в прямой эфир</Label>
                            <Select id="ko3" icon="search" options={dataUsers} />
                        </Group>
                        <Group sm>
                            <Label bold for="ko4">Собрать команду для съемки сюжета</Label>
                            <Select id="ko4" icon="search" options={dataUsers} />
                        </Group>
                        <Group>
                            <Label light right for="ko5">Не более 4 слов через пробел</Label>
                            <Input id="ko5" block placeholder="Ключевые слова" />
                        </Group>
                        <Group>
                            <InputIcon icon="clip" block placeholder="Комментарий" />
                        </Group>
                        <Group>
                            <Button block success>
                                Отправить работу
                            </Button>
                        </Group>
                    </form>
                </Right>
            </Wrap>
        </div>
    )
}

export default Feed

// +b.form-group.form-group-sm
//                     label.label.label__bold(for='ko2') Назначить редактора статьи
//                     .select
//                         .input-icon
//                             input.input.input-block#ko4(type='text')
//                             +icon({ icon: 'search', class: 'search' })
//                         .select-dropdown
//                             .select-item
//                                 .select-item__pic
//                                     img(src='%=static=%img/content/user1.png', alt='')
//                                 .select-item__cnt
//                                     p Ковалев Максим
//                                     span Выбрать

//                             .select-item
//                                 .select-item__pic
//                                     img(src='%=static=%img/content/user2.png', alt='')
//                                 .select-item__cnt
//                                     p Короленко Анастасия
//                                     span Выбрать

//                 +b.form-group.form-group-sm
//                     label.label.label__bold(for='ko3') Назначить редактора в прямой эфир
//                     .select
//                         .input-icon
//                             input.input.input-block#ko4(type='text')
//                             +icon({ icon: 'search', class: 'search' })
//                         .select-dropdown
//                             .select-item
//                                 .select-item__pic
//                                     img(src='%=static=%img/content/user1.png', alt='')
//                                 .select-item__cnt
//                                     p Ковалев Максим
//                                     span Выбрать

//                             .select-item
//                                 .select-item__pic
//                                     img(src='%=static=%img/content/user2.png', alt='')
//                                 .select-item__cnt
//                                     p Короленко Анастасия
//                                     span Выбрать

//                 +b.form-group.form-group-sm
//                     label.label.label__bold(for='ko4') Собрать команду для съемки сюжета
//                     .select
//                         .input-icon
//                             input.input.input-block#ko4(type='text')
//                             +icon({ icon: 'search', class: 'search' })
//                         .select-dropdown
//                             .select-item
//                                 .select-item__pic
//                                     img(src='%=static=%img/content/user1.png', alt='')
//                                 .select-item__cnt
//                                     p Ковалев Максим
//                                     span Выбрать

//                             .select-item
//                                 .select-item__pic
//                                     img(src='%=static=%img/content/user2.png', alt='')
//                                 .select-item__cnt
//                                     p Короленко Анастасия
//                                     span Выбрать

//                 +b.form-group
//                     label.label.label__light.label__right(for='ko5') Не более 4 слов через пробел
//                     input.input.input-block#ko5(type='text' placeholder='Ключевые слова')

//                 +b.form-group
//                     +e.input.input-icon
//                         input.input.input-block#ko6(type='text' placeholder='Комментарий')
//                         +icon({ icon: 'clip', class: 'clip' })

//                 +b.form-grop
//                     button.btn.btn-block.btn-success Отправить в работу
