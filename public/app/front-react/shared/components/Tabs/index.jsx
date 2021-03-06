import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';

import burger from './burger.png';
import './style.scss';

// function Tabs({ data, active, onChange, classNames }) {

//     let topData = data.splice(0, 6);


// }

class Tabs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            toggle: false,
            count: 0,
        };

        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    close() {
        this.setState({
            toggle: false,
        });
    }

    handleClickOutside() {
        this.close();
    }

    toggle() {
        this.setState({
            toggle: !this.state.toggle,
        });
    }

    onChange(id) {
        if (this.props.onChange) {
            this.props.onChange(id);
        }

        this.close();
    }

    updateWindowDimensions() {
        let count = 0;
//         $mobile: 719px;
// $tablet: 720px;
// $tabletMax: 1035px;
// $tabletLandscape: 1036px;
// $tabletLandscapeMax: 1599px;
// $desktop: 1600px;
        if (window.innerWidth <= 615) {
            count = 2;
        } else if (window.innerWidth <= 929) {
            count = 4;
        } else if (window.innerWidth > 930 && window.innerWidth < 1249) {
            count = 6;
        } else if (window.innerWidth >= 1250) {
            count = 6;
        }
        this.setState({
            count,
        });
    }

    render() {
        const { data, active, classNames } = this.props;
        let topData = data;
        topData = topData.slice(0, this.state.count);

        return (
            <div className={cn(['breadcrumb', classNames.root])}>
                <div className="breadcrumb__wrapper">
                    <ul className={cn(['breadcrumb__ul', classNames.ul])}>
                        {topData.map(v => (
                            <li
                                key={v.id}
                                className={cn('breadcrumb__item', {
                                    breadcrumb__item_active: v.id == active,
                                })}
                            >
                                <a
                                    className="breadcrumb__link"
                                    onClick={() => this.onChange(v.id)}
                                >
                                    {v.name}
                                </a>
                            </li>
                        ))}
                        <li
                            onClick={this.toggle}
                            className={cn('breadcrumb__burger', { breadcrumb__burger_open: this.state.toggle })}
                            role="button"
                        >
                            <div className="breadcrumb__pict-burger">
                                <span className="breadcrumb__appearance" />
                            </div>
                        </li>
                    </ul>
                    {this.state.toggle ?
                        <div className="breadcrumb__toggle">
                            <div className="breadcrumb__toggle_header">
                                <div className="breadcrumb__item breadcrumb__item_active">
                                    <a href="#" className="breadcrumb__link">
                                        Все передачи
                                    </a>
                                </div>
                            </div>
                            <ul className={cn(['breadcrumb__ul', classNames.ul])}>
                                {data.map(v => (
                                    <li
                                        key={v.id}
                                        className={cn('breadcrumb__item', {
                                            breadcrumb__item_active: v.id == active,
                                        })}
                                    >
                                        <a
                                            className="breadcrumb__link"
                                            onClick={() => this.onChange(v.id)}
                                        >
                                            {v.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }

}

Tabs.defaultProps = {
    classNames: {},
};

Tabs.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
    })),
    active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    classNames: PropTypes.shape({
        root: PropTypes.string,
        ul: PropTypes.string,
    }),
};

export default enhanceWithClickOutside(Tabs);
