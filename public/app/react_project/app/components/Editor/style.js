import styled from 'styled-components';

import {
    RatingRedux as RatingReduxBase,
    TextareaRedux as TextareaReduxBase,
    ImageLoaderRedux as ImageLoaderReduxBase,
} from 'components/Form/ReduxForm';
import { Group as GroupBase } from 'components/Form';
import {
    Left as LeftBase,
    Right as RightBase,
} from 'components/Content';
import IconBase from 'components/Icon';

import { ifProp } from 'utils/style';
import { font, padding, color } from 'constants/style';

export const Title = styled(TextareaReduxBase)`
    height: 119px;
    padding-left: 16px;
    padding-right: 16px;

    font-family: ${font.opensans};
    font-weight: 400;
    color: #333;
    font-size: 30px;
    line-height: 34px;
    letter-spacing: -0.7px;
`;

export const Subtitle = styled(TextareaReduxBase)`
    height: 96px;
    padding-left: 19px;
    padding-right: 19px;

    color: #666;
    font-family: ${font.opensans};
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0;
`;

export const Theses = styled(Subtitle)`
    font-size: 16px;
    font-weight: 400;

    resize: vertical;
`;

export const RatingRedux = styled(RatingReduxBase)`
    margin-right: 20px;
    margin-bottom: 21px;
`;

export const ImageRow = styled(GroupBase)`
    display: flex;
    justify-content: space-between;
`;

export const ImageCell = styled.div`
    display: flex;
    flex-direction: column;

    margin-bottom: 7px;

    width: 48%;

    &:not(:first-child) {
        margin-left: 4%
    }

    img {
        width: 100%;
        height: auto
    }

    > * {
        &:not(:last-child) {
            margin-bottom: 5px;
        }
    }
`;

export const ImageLoaderRedux = styled(ImageLoaderReduxBase)`
    min-height: 243px;
`;

export const Root = styled.div`
    margin-top: 6px;
    padding-left: ${padding}
`;

export const Left = styled(LeftBase) `
    margin-top: 0;
    border-right: 0;
`;

export const Right = styled(RightBase) `
    flex-basis: auto;
    width: 235px;
    align-self: center;
`;

export const VideoStatus = styled.div`
    font-family: ${font.opensans};
    font-size: 13px;
    color: #999;
    font-weight: 600;
    letter-spacing: 0.1px;

    width: 100%;

    strong {
        color: #434242;
        font-weight: 700;

    }

    span {
        margin-left: 3px;
        color: ${color.danger}

        ${ifProp('ready') `
            color: #1f9d29;
        `}
    }
`;

export const Icon = styled(IconBase) `
    margin-top: -3px;
    margin-left: 2px;
    margin-right: 5px;
`;

export const Action = styled.div`
    align-items: center;
    margin-top: 21px;
    margin-bottom: -3px;
`;

export const Time = styled.div`
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: 13px;
`;
