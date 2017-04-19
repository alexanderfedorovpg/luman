import React from 'react'
import InlineSVG from 'components/InlineSVG'

import './style.scss'
import icon from './search.svg'

function Search() {

    return (
        <div className="search header__search">
            <form className="search__form">
                <input className="search__input-text" type="text" placeholder="Поиск по сайту" />
                <div className="search__wrapper">
                    <input className="search__input-submit" type="submit" value="" />
                    <InlineSVG className="search__ico" src={icon} />
                </div>
            </form>
        </div>
    )
}

export default Search

