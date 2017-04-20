import React from 'react';
import styled, { css } from 'styled-components';
import { rem, ifProp } from 'utils/style';
import { YoutubePlayBtn } from 'components/Icon/svg';

const activeState = css`
    background-color: #f3f3f3;

    &::before {
        display: none;
    }

    & + .programs__item {
        &::before {
            display: none;
        }
    }

    .programs {
        &__close-container {
            display: block;
        }

        &__btn-container {
            display: block;
        }
    }
`;

const Wrapper = styled.article`
    position: relative;

    display: flex;
    padding: 1.4rem 0 1.6rem 1.5rem;

    cursor: pointer;

    &::before {
        content: '';

        position: absolute;
        top: 0;
        left: 1.5rem;

        width: calc(100% - 1.5rem);
        height: 1px;

        background-color: #e9e9e9;
    }

    &:first-child {
        padding: 1.1rem 0 1.8rem 1.5rem;
    }

    ${ifProp('active')(activeState)}
    &:hover {
        ${activeState}
    }
`;

const ImgWrapper = styled.a`
    position: relative;

    width: ${rem(255)};
    height: ${rem(150)};

    overflow: hidden;

    &:hover {
        .program-img-overlay {
            display: block;
        }
    }
`;

const Img = styled.img`
    max-width: 100%;

    @supports (object-fit: cover) {
        width: 100%;
        height: 100%;

        object-fit: cover;
    }
`;

const ImgOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    display: none;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, .3);
`;

const PlayBtn = styled(YoutubePlayBtn)`
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
`;

const Program = ({ active, href, src }) => (
    <Wrapper active={active}>
        <ImgWrapper href={href}>
            <Img src={src} alt="" role="presentation" />
            <ImgOverlay className="program-img-overlay">
                <PlayBtn />
            </ImgOverlay>
        </ImgWrapper>
        <div class="programs__info">
            <p class="programs__date">
                15 января 2017,
                <span class="programs__time">15:18</span>
            </p>
            <a class="programs__category" href-jv0="href-jv0">тайм-код</a>
            <p class="programs__title">Триумф Дональда Трампа: голубые туфли Мелании и коробка от Тиффани
            </p>
            <div class="programs__tags">
                <span class="programs__tag">#вашингтон</span>
                <span class="programs__tag">#дональд трамп</span>
                <span class="programs__tag">#инаугурация</span>
                <span class="programs__tag">#сша</span>
            </div>
        </div>
        <div class="programs__btn-container">
            <button class="btn btn-md btn-danger"><i class="icon icon-delete-reverse"></i>Удалить</button>
            <button class="btn btn-md btn-success">Редактировать</button>
        </div>
        <div class="programs__close-container">
            <i class="icon icon-delete-reverse"></i>
            <div class="programs__close-tip">
                Убрать с главной
            </div>
        </div>
    </Wrapper>
);

export default Program;
