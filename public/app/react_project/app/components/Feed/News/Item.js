import React from 'react';
import styled from 'styled-components';
import randomString from 'random-string';
import IconTip from 'components/IconTip';
import Icon from 'components/Icon';
import { font, padding } from 'constants/style';

const titleClassName = randomString();

const Root = styled.a`
    position: relative;

    display: block;
    padding-right: ${padding};
    padding-left: ${padding};
    margin-bottom: -1px;

    cursor: pointer;

    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;

    &:hover {
        background-color: #f0f0f0;

        .ra-tooltip-wrapper {
            display: block;
        }

        .${titleClassName} {
            font-weight: 600;
        }

    }

    &:first-child {
        border-top: 0;
    }

    &:last-child {
        border-bottom: 0;
    }
`

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 18px 0 17px;
`

const ItemIcon = styled(Icon)`
    flex-shrink: 0;
`

const Title = styled.span`
    margin: 0 0 0 6px;

    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    color: #333333;
`

const Work = styled(IconTip)`
    position: absolute;
    top: 50%;
    right: -11px;
    z-index: 2;

    display: none;

    transform: translateY(-50%);
`

const Ignore = styled(Work)`
    right: 24px;
`

function Item({ data, toWork, hide, open, style }) {
    return (
        <Root onClick={() => open(data.id)} style={style}>
            <Wrapper>
                <ItemIcon type="tass" />
                <Title className={titleClassName}>
                    {data.header}
                </Title>
                <Ignore
                    message="Игнорировать"
                    eventType="hover"
                    direction="bottom"
                    icon="delete"
                    onClick={e => {
                        hide(data.id)
                        e.stopPropagation()
                    }}
                />
                <Work
                    message="Работаем!"
                    eventType="hover"
                    direction="bottom"
                    icon="go-right"
                    onClick={e => {
                        toWork(data.id)
                        e.stopPropagation()
                    }}
                />
            </Wrapper>
        </Root>
    )
}

Item.PropTypes = {
    data: React.PropTypes.object.isRequired
}

export default Item
