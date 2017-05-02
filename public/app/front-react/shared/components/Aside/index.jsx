import React from 'react'

import Video from './Video'
import EnterOne from './EnterOne'

function Aside({news, video}) {
    const lastNews = news.filter(isNow)

    const nowNews = lastNews.sort(latestDate).slice(0, 5)
    const todayNews = lastNews.sort(highestRating).slice(0, 3)
    const noiseNews = lastNews.sort(lowestRating).slice(0, 5)
    const randomNews = lastNews.slice(-7)

    const videoByDate = video.sort(latestDate)
    const latestVideo = videoByDate[0] || {}
    const moreVideo = videoByDate.slice(1, 4)
    const listVideo = videoByDate.slice(4, 7)

    return (
        <div className="right-col">
            <Video className="general-news__general-video"  />
            <EnterOne className="general-news__enter-one" data={latestVideo}/>
        </div>
    )
}

const millisecondsInDay = 24*60*60*1000

const latestDate = (a, b) => Date.parse(b.PublishDate) - Date.parse(a.PublishDate)
const highestRating = (a, b) => b.Top - a.Top
const lowestRating = (a, b) =>a.Top - b.Top

const isNow = value => {
    if (!value) return false

    const date = Date.parse(value.PublishDate)

    if (!date) return false

    if (Date.now() - date < millisecondsInDay) return true
}

const notNow = value => !isNow(value)

export default Aside;
