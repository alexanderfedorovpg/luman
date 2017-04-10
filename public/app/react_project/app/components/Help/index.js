import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import Button from '../Button'
import Gallery from './Gallery'
import Tags from '../Tags/Static'
import gradient from './img/text-opacity.png'

import {
    Group,
    Textarea,
    Horizontal,
    Input,
    Checkbox
} from './../Form'

import { padding, font } from '../../constants/style'

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

function Help({ onClose }) {
    return (
        <Root>
            <Header>
                <Link>
                    <span>?</span>
                    Справка
                </Link>
                <Icon type="delete-lg" onClick={onClose} />
            </Header>
            <form>
                <Group>
                    <CustomTextarea light block defaultValue="Министр иностранных дел Великобритании Борис Джонсон" />
                </Group>
                <Group horizontal>
                    <CustomCheckbox name="info">
                        Информация
                    </CustomCheckbox>
                    <CustomCheckbox name="photo">
                        Фото
                    </CustomCheckbox>
                    <CustomCheckbox name="video">
                        Видео
                    </CustomCheckbox>
                </Group>
                <Group>
                    <Button block success>Поиск</Button>
                </Group>
                <Group>
                    <CustomGallery data={dataGallery} />
                </Group>
                <Group>
                    <Text>
                        Министр иностранных дел и по делам Содружества Наций (англ. Her Majesty's Principal Secretary of State for Foreign and Commonwealth Affairs, точный перевод Её Величества Главный Государственный Секретарь по иностранным и Содружества Наций делам), обычно упоминается как министр иностранных дел, является членом Правительства Её Величества, возглавляя министерство иностранных дел и по делам Содружества Наций, является ответственным за отношения с иностранными государствами, за вопросы, имеющие отношение к Содружеству Наций и заморским территориям Великобритании, а также за продвижение британских интересов за границей...
                    </Text>
                </Group>
                <Group>
                    <Tags data={dataTags} />
                </Group>
            </form>
        </Root>
    )
}

export default Help
