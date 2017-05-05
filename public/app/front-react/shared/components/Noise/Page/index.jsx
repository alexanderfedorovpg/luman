import React, { PureComponent } from 'react'
import Masonry from 'react-masonry-component'

import Video from 'components/GeneralVideo'
import News from 'components/News'
import LoadMore from 'components/LoadMore'
import Title from 'components/Title'
import Block from 'components/Block'
import BlockBorder from 'components/Block/Border'
import MiniNews from 'components/MiniNews'

import './style.scss'

class Noise extends PureComponent {

    renderRow(data) {
        let items = [
            <Block data={data[0]} className="noize-all__block-square" />,
            <div className="noize-all__list-mini">
                {data.slice(1, 4).map(v => (
                    <MiniNews key={v.id} data={v} className="noize-all__mini-news" />
                ))}
            </div>,
            <BlockBorder data={data[4]} className="noize-all__block-rectangle-border" />,
            <div className="noize-all__list-mini">
                {data.slice(5, 11).map(v => (
                    <MiniNews key={v.id} data={v} className="noize-all__mini-news" />
                ))}
            </div>,
            <Block data={data[11]} className="noize-all__block-square" />,
            <div className="noize-all__list-mini">
                {data.slice(12, 16).map(v => (
                    <MiniNews key={v.id} data={v} className="noize-all__mini-news" />
                ))}
            </div>,
            <BlockBorder data={data[16]} className="noize-all__block-rectangle-border" />,
            <div className="noize-all__list-mini">
                {data.slice(17, 21).map(v => (
                    <MiniNews key={v.id} data={v} className="noize-all__mini-news" />
                ))}
            </div>,
            <div className="noize-all__list-mini">
                {data.slice(21, 25).map(v => (
                    <MiniNews key={v.id} data={v} className="noize-all__mini-news" />
                ))}
            </div>,
            <Block data={data[25]} className="noize-all__block-square" />,
            <BlockBorder data={data[26]} className="noize-all__block-rectangle-border" />,
            <div className="noize-all__list-mini">
                {data.slice(27, 30).map(v => (
                    <MiniNews key={v.id} data={v} className="noize-all__mini-news" />
                ))}
            </div>,
        ]

        return (
            <Masonry
                className={'noize-all__row'}
                options={{
                    columnWidth: '.noize-all__item'
                }}>
                {items.map((v, i) => (
                    <div key={i} className="noize-all__item">
                        {v}
                    </div>
                ))}
            </Masonry>
        )
    }

    render() {
        const { news, noise, onLoadRequest, canLoad } = this.props

        return (
            <div className="inner-wrapper">
                <div className="noize-all">
                    <div className="noize-all__container container">
                        <div className="noize-all__left left-col left-col left-col_width_inner">
                            <Title className="noize-all__title-block">
                                Инфошум
                            </Title>
                            <div className="noize-all__list">
                                {this.renderRow(noise)}
                            </div>
                            {canLoad
                                ? (
                                    <LoadMore onClick={onLoadRequest}>
                                        Больше новостей
                                    </LoadMore>
                                )
                                : null
                            }
                        </div>
                        <div className="noize-all__right right-col">
                            <Video className="noize-all__general-video" />
                            <News data={news} className="noize-all__news" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Noise
