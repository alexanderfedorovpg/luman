import React from 'react'

import Aside from 'containers/Aside';

import './style.scss'

function How({}) {
    return(
        <div className="inner-wrapper inner-about">
            <div className="inner-about__container container">
                <div className="inner-about__left left-col left-col">
                    <div className="how-watch">
                        <h1>Как смотреть RTVi</h1>
                        <p>Интеллект начинает материалистический стратегический рыночный план. В соответствии с законом Ципфа, стратификация многопланово индуцирует креативный аутотренинг. Здесь автор сталкивает два таких достаточно далёких друг от друга явления как медиапланирование достижимо в разумные сроки. Как мы уже знаем, рекламное сообщество понимает интеллект.</p>
                        <div className="how-watch__item how-watch__viewers">
                            <h2 className="subtitle-border">
                                Зрителям
                            </h2>
                            <h3 className="subtitle-order">
                                <i className="icon dig" data-subtitle-order="1">
                                </i>
                                Настроить спутниковую антенну:
                            </h3>
                            <div className="text-cols">
                                <p>Satellite: Eutelsat, Hotbird 13B <br/>Broadcasting format: SD MPEG-2 DVB-S (QPSK) <br/> Frequency: 12322 <br/> Polarization: Horizontal </p>
                                <p>Video PID: 41 <br/> Digital stream speed: 27500 <br/> FEC: 3/4 <br/> Conditional Access System: Viaccess 4.0 </p>
                            </div>
                            <h3 className="subtitle-order">
                                <i className="icon dig" data-subtitle-order="2">
                                </i>
                                Подключиться с помощью местных операторов:
                            </h3>
                            <div className="how-watch__list">
                                <div className="how-watch__list__item">
                                    <h4>Беларусь</h4>
                                    <p>- Cosmos TV (Космос ТВ),  www.cosmostv.by, +375 17 289-29-29, <a href="#">info@cosmostv.com</a></p>
                                    <p>- Betateleset{"'"} (Бетателесеть), www.betatv.by, +375 17 256-91-03,  <a href="#">info@betatv.by</a></p>
                                </div>
                            </div>
                            <div className="how-watch__list">
                                <div className="how-watch__list__item">
                                    <h4>Германия</h4>
                                    <p>- Kartina TV, www.kartina.tv, +069 84 84 540, <a href="#">info@kartina.tv</a></p>
                                </div>
                            </div>
                            <div className="how-watch__list">
                                <div className="how-watch__list__item">
                                    <h4>Латвия</h4>
                                    <p>- Lattelecom, www.lattelecom.lv, +177 67000177, <a href="#">lattelecom@lattelecom.lv</a></p>
                                    <p>- Content Generation, www.contentgeneration.eu, +44 20 7870 1104, , <a href="#">oleg@contentgeneration.eu</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="how-watch__item how-watch__hotel">
                            <h2 className="subtitle-border">
                                Отельерам
                            </h2>
                            <p>Интеллект начинает материалистический стратегический рыночный план. В соответствии с законом Ципфа, стратификация многопланово индуцирует креативный аутотренинг. Здесь автор сталкивает два таких достаточно далёких друг от друга явления как медиапланирование достижимо в разумные сроки. Как мы уже знаем, рекламное сообщество понимает интеллект. </p>
                            <h4>Контакты:</h4>
                            <p className="how-watch__contacts">
                                <b>Мария Уланова, </b>
                                <a href="#">hotels@rtvi.com </a>
                                +44 20 3287 8708
                                <br/>
                                Обращаем ваше внимание на, что все звонки на данный номер являются бесплатными
                            </p>
                        </div>
                        <div className="how-watch__item how-watch__region">
                            <h2>Узнайте, как смотреть RTVi в Вашем регионе</h2>
                            <form action="" className="how-watch__form">
                                <div className="col-l">
                                    <div className="form-group">
                                        <input type="text" className="input input-block" placeholder="Ваше имя"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="input input-block" placeholder="Электронная почта"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="input input-block" placeholder="Адрес и индекс"/>
                                    </div>
                                </div>
                                <div className="col-r">
                                    <div className="form-group">
                                        <input type="tel" className="input input-block" placeholder="Телефон"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="input input-block" placeholder="Страна"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="input input-block" placeholder="Город"/>
                                    </div>                                
                                </div>
                                <button className="btn btn-submit">
                                    Отправить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <Aside />
            </div>
        </div>
    )
}

export default How;
