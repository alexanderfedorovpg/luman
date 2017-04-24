import styled, { css } from 'styled-components';
import { rem, ifProp } from 'utils/style';
import { YoutubePlayBtn } from 'components/Icon/svg';
import Button from 'components/Button';

export const activeState = css`
    background-color: #f3f3f3;

    &::before {
        display: none;
    }

    .record-buttons {
        display: block;
    }

    & + * {
        &::before {
            display: none;
        }
    }
`;

export const Wrapper = styled.article`
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

export const ImgWrapper = styled.a`
    position: relative;

    width: ${rem(255)};
    height: ${rem(150)};

    overflow: hidden;

    &:hover {
        .record-img-overlay {
            display: block;
        }
    }
`;

export const Img = styled.img`
    max-width: 100%;

    @supports (object-fit: cover) {
        width: 100%;
        height: 100%;

        object-fit: cover;
    }
`;

export const ImgOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    display: none;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, .3);
`;

export const PlayBtn = styled(YoutubePlayBtn)`
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
`;

export const Info = styled.div`
    width: 42%;
    margin-left: 1.5rem;

    color: #000;
    text-decoration: none;
`;

export const RecordDate = styled.time`
    display: block;
    padding: 0 0 0 .1rem;
    margin-bottom: 0;

    font-size: .75rem;
    font-weight: 600;
    color: #666;
    letter-spacing: -.01rem;
`;

export const Time = styled.span`
    display: inline-block;
    margin-left: .2rem;

    font-size: .8rem;
    color: #999;
`;

export const Program = styled.a`
    font-size: .8rem;
    letter-spacing: -.03rem;
    text-transform: uppercase;
    color: #369;
    text-decoration: none;
`;

export const Title = styled.h2`
    margin: 0;

    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -.072rem;
`;

export const Buttons = styled.div`
    position: absolute;
    top: 5.1rem;
    right: 2.5rem;

    display: none;

    .record-btn {
        width: 9.9rem;

        border: none;
    }
`;

export const StyledBtn = styled(Button)`
    background-color: #fff;

    &:not(:last-child) {
        margin-right: .3rem;
    }
`;
