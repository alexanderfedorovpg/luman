import React from 'react'
import styled from 'styled-components'

import Header from './Shared/Header'
import Footer from './Shared/Footer'
import Container from './Shared/Container'
import Big from './Shared/Big'
import Now from './Shared/Now'
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
import videoPlaceholderSrc from './obzor-main.jpg'

const Root = styled.div`
    margin-top: 1px;
    padding-top: ${rem(54)};
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

function PreviewDefault({ data }) {

    const news = data.news||[]
    const now = news.filter(v=>v.category.id == 1).map(v=>v.data)
    const today = news.filter(v=>v.category.id == 2).map(v=>v.data)
    const other = news.filter(v=>v.category.id == 3).map(v=>v.data)

    const noise = (data.noise||[]).map(v=>v.data)

    const randomNews = other.slice(0, 7)
    const moreNews = other.slice(7, 13)

    const broadcast = (data.broadcast||[]).map(v => v.data)
    const firstVideo = broadcast[0] || {}
    const secondVideo = broadcast[1]

    return (
        <Root>
            <Header />
            <Wrapper>
                <Left>
                    <LeftWrapper>
                        <Big data={now[0]} />
                        <Now data={now.slice(1, 5)} />
                    </LeftWrapper>
                    <LeftWrapper>
                        <Today data={today} />
                        <Noise data={noise} />
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
                    <EnterOne data={secondVideo} />
                </Right>
                <LeftMore>
                    <Banner />
                    <Random data={randomNews} />
                </LeftMore>
                <Right>
                    <Subscribe />
                    <More data={moreNews} />
                </Right>
            </Wrapper>
            <Footer />
        </Root>
    )
}

export default PreviewDefault
