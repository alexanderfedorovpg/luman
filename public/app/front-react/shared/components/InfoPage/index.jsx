import React from 'react'

import Aside from 'containers/Aside';

import './style.scss'

function Info({now}) {
    return(
        <div className="inner-wrapper inner-about">
            <div className="inner-about__container container">
                <div className="inner-about__left left-col">
                    <div className="how-watch">
                        <h1>Привет и добро пожаловать на новый сайт RTVI!</h1>
                        <div className="how-watch__item" id="about">
                            <h2 className="subtitle-border">
                                Как тут все устроено?
                            </h2>
                            <p className="how-watch__introtext">
                                На нашем новом сайте четыре раздела: «Главная», «Новости», «Инфошум» и «Из эфира». Чтобы попасть на главную страницу, нужно кликнуть логотип RTVI в верхнем меню. Остальные разделы представлены поименно.
                            </p>
                        </div>
                        <div className="how-watch__item" id="news">
                            <h2 className="subtitle-border">
                                Что такое «Главная»?
                            </h2>
                            <p className="how-watch__introtext">
                                Главная страница содержит картину дня. Это те новости, которые редакция RTVI считает важнейшими на эту минуту.
                            </p>
                        </div>
                        <div className="how-watch__item" id="noise">
                            <h2 className="subtitle-border">
                                Что такое «Новости»?
                            </h2>
                            <p className="how-watch__introtext">
                                Здесь представлены все новости, которые мы считаем значимыми: и важнейшие, и остальные. В хронологическом порядке.
                            </p>
                        </div>
                        <div className="how-watch__item" id="broadcast">
                            <h2 className="subtitle-border">
                                Что такое «Инфошум»?
                            </h2>
                            <p className="how-watch__introtext">
                                «Инфошум» — это ненастоящие новости, о которых, тем не менее, все говорят. Часть из них — фейки, часть — просто раздутые события, не заслуживающие серьезного внимания. Мы не можем их игнорировать, но сообщить вам о том, что это инфошум, — наша обязанность.
                            </p>
                        </div>
                        <div className="how-watch__item" id="broadcast">
                            <h2 className="subtitle-border">
                                Что такое «Из эфира»?
                            </h2>
                            <p className="how-watch__introtext">
                                Сюда попадают программы из эфира RTVI. Как нарезки самого интересного, так и целые выпуски наших программ.
                            </p>
                        </div>
                        <div className="how-watch__item" id="broadcast">
                            <h2 className="subtitle-border">
                                Что это за окно справа, в углу?
                            </h2>
                            <p className="how-watch__introtext">
                                Это Ваш Персональный Ведущий. В течение дня эфирные лица RTVI и изредка просто известные люди записывают ролик с пересказом сути новости, а мы монтируем для него необходимое видео. Длительность такого ролика очень небольшая (как правило, 30 секунд) — посмотреть его займет ровно столько же, сколько прочитать текст заметки.
                            </p>
                        </div>
                        <div className="how-watch__item" id="broadcast">
                            <h2 className="subtitle-border">
                                И что, этот Персональный Ведущий у вас в каждой заметке?
                            </h2>
                            <p className="how-watch__introtext">
                                Да. Все новости, за исключением инфошума, снабжены одним или даже несколькими видео. Все наши новости можно читать или смотреть.
                            </p>
                        </div>
                        <div className="how-watch__item" id="broadcast">
                            <h2 className="subtitle-border">
                                Так что мне делать — смотреть или читать?
                            </h2>
                            <p className="how-watch__introtext">
                                Этот выбор редакция RTVI оставляет за вами.
                            </p>
                        </div>
                    </div>
                </div>
                <Aside noise={null} top={null} broadcast={null} noisePage={null} now={now} inside />
            </div>
        </div>
    )
}


export default Info;
