import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './Header'
import { Wrap, Left, Right } from './../Content'
import News from './../News'
import Tags from './../Tags'
import Rating from './../Rating'
import Icon from './../Icon'
import Button from './../Button'
import {
    Input,
    InputIcon,
    Group,
    Textarea,
    Label,
    Select
} from './../Form'

function Feed({ news, moved, users }) {
    return (
        <div>
            <Header moved={moved} />
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
