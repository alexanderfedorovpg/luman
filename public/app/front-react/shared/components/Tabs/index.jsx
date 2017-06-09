import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
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
            count: 0
        }

        this.toggle = this.toggle.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    toggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    updateWindowDimensions() {
        let count = 0;
//         $mobile: 719px;
// $tablet: 720px;
// $tabletMax: 1035px;
// $tabletLandscape: 1036px;
// $tabletLandscapeMax: 1599px;
// $desktop: 1600px;
        if (window.innerWidth <= 720) {
            count = 2;
        } else if (window.innerWidth <= 1035) {
            count = 4;
        } else if (window.innerWidth > 1035) {
            count = 5;
        } else if (window.innerWidth > 1599) {
            count = 6;
        }
        this.setState({
            count: count,
        });
    }


    render() {

        const { data, active, onChange, classNames } = this.props;
        let topData = data;
        topData = topData.slice(0, this.state.count);
        


        return (
            <div className={cn(['breadcrumb', classNames.root])}>
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
                                onClick={() => onChange(v.id)}
                            >
                                {v.name}
                            </a>
                        </li>
                    ))}
                    <li onClick={this.toggle} className="breadcrumb__burger">
                        <img src={burger} alt=""/>
                    </li>
                </ul>
                {this.state.toggle ?
                    <div className="breadcrumb__toggle">
                        <div className="breadcrumb__toggle_header">
                            <div className="breadcrumb__item breadcrumb__item_active">
                                <a href="#" className="breadcrumb__link">
                                    Все новости
                                </a>
                            </div>
                            <img onClick={this.toggle} src={burger} alt=""/>
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
                                        onClick={() => onChange(v.id)}
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

export default Tabs;
