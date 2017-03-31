import React from 'react'
import styled from 'styled-components'

import { Wrap, Left, Right } from './../Content'
import News from './../News'
import Tags from './../Tags'
import Rating from './../Rating'
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

function Feed({ news, moved, users }) {
    return (
        <div>
            <Header moved={moved}>
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
                    <News data={news} />
                </Left>
                <Right>
                    <form>
                        <Tags data={['tag1', 'tag2', 'tag3']} />
                        <Rating value={5} />
                        <Group>
                            <Textarea block defaultValue="Кремль заявил о «серьезной усталости» от обвинений в кибератаках" />
                        </Group>
                        <Group sm>
                            <Label bold for="ko2">Назначить редактора статьи</Label>
                            <Select id="ko2" icon="search" options={users} />
                        </Group>
                        <Group sm>
                            <Label bold for="ko3">Назначить редактора в прямой эфир</Label>
                            <Select id="ko3" icon="search" options={users} />
                        </Group>
                        <Group sm>
                            <Label bold for="ko4">Собрать команду для съемки сюжета</Label>
                            <Select id="ko4" icon="search" options={users} />
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
