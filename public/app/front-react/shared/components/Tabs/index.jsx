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
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }


    render() {

        const { data, active, onChange, classNames } = this.props;
        let topData = data;
        topData = topData.slice(0, 6);
        


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
