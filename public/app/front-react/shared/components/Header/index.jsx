import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { withRouter } from 'react-router-dom';
import Burger from 'components/Burger';
import RSS from 'components/RSS';
import Search from 'components/Search';
import InfoIcon from 'components/Icon/Info';
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom';

import Logo from './Logo';
import TopMenu from './TopMenu';
import Rates from './Rates';
import Alarm from './Alarm';

import SideMenu from './SideMenu';

import './style.scss';

class Header extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            searchOpen: false,
            toggleMenu: false,
        }

        this.toggleMenu = this.toggleMenu.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.setSearchOpen = this.setSearchOpen.bind(this);
    }

    onSearch(query) {
        const { history } = this.props;
        const location = {
            pathname: '/search',
            search: `?query=${query}`,
        };

        history.push(location);
    }

    toggleMenu() {
        console.log('toggle menu');

        this.setState({
            toggleMenu: !this.state.toggleMenu
        })
    }

    setSearchOpen(value) {
        if (this.state.searchOpen !== value) {
            this.setState({
                searchOpen: value
            })
        }
    }

    render() {
        const { war, warTitle } = this.props;

        return (
            <div>
                <MediaQuery maxWidth="614px">
                    <SideMenu active={this.state.toggleMenu} toggle={this.toggleMenu}/>
                </MediaQuery>
                <header
                    className={classNames('header', {
                        header_war: war,
                        'header_open-search': this.state.searchOpen
                    })}
                >
                    {war
                        ? <Alarm data={warTitle} />
                        : null
                    }
                    <div className="header__container container">
                        <div className="header__left-part">
                            <div className="header__part-wrapper">
                                <MediaQuery maxWidth="614px">
                                    <Burger toggle={this.toggleMenu} active={this.state.toggleMenu}/>
                                </MediaQuery>
                                <Logo war={war} />
                                <Link to="/info-page">
                                    <InfoIcon width="18px" height="18px" />
                                </Link>
                                <TopMenu />
                                <MediaQuery minWidth="1250px">
                                    <Rates />
                                </MediaQuery>
                            </div>
                        </div>
                        <div className="header__right-part">
                            <RSS />
                            <MediaQuery maxWidth="614px">
                                <Link to="/info-page">
                                    <InfoIcon width="18px" height="18px" />
                                </Link>
                            </MediaQuery>
                            <Search
                                open={this.state.searchOpen}
                                setOpen={this.setSearchOpen}
                                onSearch={this.onSearch}
                                classNames={{ root: 'header__search' }}
                            />
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default withRouter(Header);
