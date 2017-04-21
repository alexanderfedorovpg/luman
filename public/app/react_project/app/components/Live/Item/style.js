import styled, { css } from 'styled-components';
import { ifProp, rem } from 'utils/style';
import Rating from 'components/Rating/Item';
import HashTags from 'components/HashTags';
import TipIcon from 'components/IconTip';

const activeStyle = css`
    border-bottom: 1px solid transparent;
    background-color: #f3f3f3;

    .ra-tooltip-wrapper {
        display: block;
    }
`;

export const Wrapper = styled.article`
    position: relative;

    display: flex;
    box-sizing: border-box;
    justify-content: flex-start;
    flex-direction: row-reverse;

    padding-top: 1rem;
    padding-bottom: .6rem;

    border-right: 1px solid #d7d7d7;
    border-bottom: 1px solid #e9e9e9;
    cursor: pointer;

    ${ifProp('active')(activeStyle)}
    &:hover {
        ${activeStyle}
    }
`;

export const LeftColumn = styled.footer`
    width: 17.4%;
    padding-right: .4rem;

    text-align: right;
`;

export const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 20px;
`;

export const StyledDate = styled.span`
    display: block;
    margin: -.1rem 0 0;

    font-size: .7rem;
    font-weight: 600;
    color: #666;
    letter-spacing: .02rem;
`;

export const StyledTime = styled.span`
    margin: .15rem 0 0;

    font-size: ${rem(12)};
    color: #999;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    height: 30px;
`;

export const StyledRating = styled(Rating)`
    margin-right: .4rem;
    margin-bottom: 0;
`;

export const Category = styled.div`
    margin: 0;

    font-family: $opensans;
    font-size: 11px;
    font-weight: 400;
    color: #999999;
    text-transform: uppercase;
`;

export const Title = styled.h2`
    padding-right: 1rem;
    margin-top: 1px;
    margin-bottom: 3px;
    margin-left: -2px;

    line-height: 1.35;
    letter-spacing: -.02em;
    font-size: ${({ rating }) => rating === 8 ? 24 : rating + 13}px;
    font-weight: 400;
`;

export const StyledTags = styled(HashTags)`
    min-height: 0.5rem;
    margin-left: -.2rem;
`;

export const ToLive = styled(TipIcon)`
    position: absolute;
    top: 2.9rem;
    right: -.7rem;

    display: none;
`;
