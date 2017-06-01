import React from 'react'
import styled from 'styled-components'

import Header from './Shared/Header'
import Footer from './Shared/Footer'
import Container from './Shared/Container'
import Big from './Shared/Big'
import Mini from './Shared/Mini'
import MiniNoise from './Shared/Noise/Mini'
import Group from './Shared/Group'
import Block from './Shared/Block'
import Now from './Shared/Now/War'
import Today from './Shared/Today'
import Noise from './Shared/Noise'
import BannerBase from './Shared/Banner'
import RandomBase from './Shared/Random'
import SubscribeBase from './Shared/Subscribe'
import MoreBase from './Shared/More'
import EnterOneBase from './Shared/EnterOne'
import Video from './Shared/Video'

import { rem } from 'utils/style'
import { color } from 'constants/style'
import videoPlaceholderSrc from './obzor-main-new.jpg'

const Root = styled.div`
    margin-top: 1px;
    padding-top: ${rem(104)};
`

const Wrapper = styled(Container)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-between;
    margin-bottom: ${rem(60)};
`

const Left = styled.div`
    width: ${rem(915)};
`

const LeftMore = styled.div`
    width: ${rem(932)};
`

const Right = styled.div`
    width: ${rem(300)};
`

const LeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &:not(:first-child) {
        margin-top: ${rem(16)};
    }
`

const Banner = styled(BannerBase)`
    width: 100%;
    margin-top: ${rem(24)};
`

const Random = styled(RandomBase)`
    margin-top: ${rem(26)};
`

const Subscribe = styled(SubscribeBase)`
    margin-top: ${rem(15)};
`

const More = styled(MoreBase)`
    margin-top: ${rem(23)};
`

const EnterOne = styled(EnterOneBase)`
    margin-top: ${rem(30)};
`

const VideoPlaceholder = styled.img`
    width: ${rem(300)};

    object-fit: cover;
    object-position: top;
`

const Some = styled.div`
    width: ${rem(300)};
    padding-left: ${rem(14)};
`

function PreviewWar({ data, online }) {
    const options = data.options

    const news = data.news||[]
    const now = news.filter(v=>v.category.id == 1).map(v=>v.data)
    const today = news.filter(v=>v.category.id == 2).map(v=>v.data)
    const other = news.filter(v=>v.category.id == 3).map(v=>v.data)

    const warNews = data.war||[]
    const breakingNews = warNews.filter(v=>v.category.id == 4).map(v=>v.data)
    const newsBlock = warNews.filter(v=>v.category.id == 5).map(v=>v.data)

    const noise = (data.noise||[]).map(v=>v.data)

    const randomNews = other.slice(0, 7)
    const moreNews = other.slice(7, 13)

    const broadcast = (data.broadcast||[]).map(v => v.data)
    const firstVideo = broadcast[0] || {}
    const secondVideo = broadcast[1]

    return (
        <Root>
            <Header title={options.title} />
            <Wrapper>
                <Left>
                    <LeftWrapper>
                        <Big data={breakingNews[0]} title={options.title} />
                        <Now data={online[0]} />
                    </LeftWrapper>
                    <LeftWrapper>
                        <Today data={today} war />
                        <Some>
                            <Block
                                data={today[3]}
                                warTitle={secondVideo.title} />
                            <div>
                                {today.slice(4, 8).map(v => (
                                    <Mini key={v.id} data={v} />
                                ))}
                            </div>
                        </Some>
                    </LeftWrapper>
                </Left>
                <Right>
                    {firstVideo.video
                        ? (
                            <Video data={firstVideo} />
                        )
                        : (
                            <VideoPlaceholder src={videoPlaceholderSrc} />
                        )
                    }
                    {!!newsBlock.length && (
                        <Group title="Другие новости" margin>
                            {newsBlock.slice(0, 4).map(v => (
                                <MiniNoise key={v.id} data={v} />
                            ))}
                        </Group>
                    )}
                </Right>
                <LeftMore>
                    <Banner />
                    <Random data={randomNews} />
                </LeftMore>
                <Right>
                    <Subscribe />
                    {newsBlock.slice(4, 10).map(v => (
                        <MiniNoise key={v.id} data={v} />
                    ))}
                </Right>
            </Wrapper>
            <Footer />
        </Root>
    )
}

export default PreviewWar
