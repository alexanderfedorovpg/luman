import React from 'react'
import styled from 'styled-components'

import { rem } from 'utils/style'
import { color } from 'constants/style'

const Title = styled.p`
    font-size: ${rem(14)};
    line-height: ${rem(24)};
    color: ${color.white};
    text-transform: uppercase;
`

const List = styled.div`
    margin-top: ${rem(7)};
`

const Item = styled.a`
    outline: none;
`

const Img = styled.img`
    width: ${rem(30)};

    margin-right: ${rem(9)};
`

function Subscribe({ className }) {

    return (
        <div>
            <Title>
                Подпишитесь на нас
            </Title>
            <List>
                {subData.map(({ img, href }, i) => (
                    <Item
                        key={i}
                        target="_blank"
                        className="subscribe-networks__ico-link"
                        href={href || '#'}>
                        <Img src={img} alt="" role="presentation" />
                    </Item>
                ))}
            </List>
        </div>
    )
}

export default Subscribe

const subData = [
    {
        title: 'facebook',
        img: '/content/subscribe-networks/facebook.png',
    },
    {
        title: 'twitter',
        img: '/content/subscribe-networks/twitter.png',
    },
    {
        title: 'youtube',
        img: '/content/subscribe-networks/youtube.png',
    },
    {
        title: 'viber',
        img: '/content/subscribe-networks/viber.png',
    },
    {
        title: 'ok',
        img: '/content/subscribe-networks/ok.png',
    },
    {
        title: 'rss',
        img: '/content/subscribe-networks/rss.png',
    },
];
