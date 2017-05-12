import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Close, Check, ArrowUp, ArrowDown } from 'components/Icon/svg';
import Button from './';

const types = {
    cancel: {
        style: { danger: true },
        icon: <Close opacity=".5" width="14" heiht="14" />,
        defaultText: 'Отменить',
    },
    save: {
        style: { success: true },
        icon: <Check color="#c1c8bd" width="12px" height="12px" />,
        defaultText: 'Сохранить',
    },
    edit: {
        style: { primary: true },
        icon: <ArrowUp color="#c1c8bd" width="12px" height="14px" />,
        defaultText: 'Редактировать',
    },
    upload: {
        style: { primary: true },
        icon: <ArrowDown opacity=".33" width="12px" height="14px" />,
        defaultText: 'Загрузить',
    },
};

const TypedBtn = ({ children, buttonType, ...props }) => (
    <Button {...types[buttonType].style} {...props}>
        {types[buttonType].icon}
        {
            children ?
                Children.toArray(children) :
                types[buttonType].defaultText
        }
    </Button>
);

TypedBtn.propTypes = {
    children: PropTypes.node,
    buttonType: PropTypes.string.isRequired,
};

export default TypedBtn;
