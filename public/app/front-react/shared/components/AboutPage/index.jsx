import React from 'react'

import Aside from '../Aside';

import Team from './Team'

import './style.scss'

function About({news, videoNews}) {
    const newsList = news;
    const video = videoNews;
    console.log(video);
    return (
      <div className="inner-wrapper">
        <div className="inner-about inner-about inner-about_margin">
          <div className="inner-about__container container">
            <div className="inner-about__left left-col left-col left-col_position_relative">
              <h1>О телеканале</h1>
              <div className="text-bg-gray inner-about__text-bg-gray">
                <div className="text-bg-gray__block-text"><span className="text-bg-gray__text">Мы связываем весь глобальный русскоязычный мир через наши общие культурные ценности, через общий язык и — что важно — общую новостную повестку</span>
                </div>
              </div>
              <div className="inner-about__content">
                <p>RTVi — международный русскоязычный телеканал, осуществляющий вещание на территории ряда государств СНГ (Украины, Казахстана, Молдовы), Грузии, стран Балтии, Германии, Израиля, Великобритании, Испании, США, Канады, Австралии и других стран. Общая аудитория телеканала RTVi составляет около 25 млн человек.
                </p>
                <p>Ключевая задача RTVi как глобального международного медиа — связать весь глобальный русскоязычный мир через наши общие культурные ценности, через общий язык и — что важно — общую новостную повестку.
                </p>
                <p>RTVi — это не просто телеканал, а современное медиа, доступное во всех средах, где есть наша аудитория: и эфире,  и в социальных медиа.
                </p>
                <p>Ценности бренда RTVi — это объективность, актуальность, открытость, доступность и, главное, — объединение разных территорий в одну глобальную русскоязычную сеть с единым языком, ментальностью и культурой.
                </p>
                <p>Миссия канала — удовлетворить потребность аудитории в объективных и оперативных новостях и актуальных форматах.
                </p>
                <p>Цель — создание мультиплатформенного медиа, которое в разных средах дотягивается до разных аудиторий».
                </p>
                <p>После получения заполненной формы, мы сможем отправить Вам контактную информацию партнеров RTVi (кабельных операторов) в Вашем регионе.
                </p>
              </div>
              <Team />
            </div>
            <Aside news={newsList} video={video}/>
          </div>
        </div>
      </div>
    )
}

export default About;
