import React from 'react';
import { string, bool } from 'prop-types';

import { switchSVGAttrToReactProp, getSVGFromSource, extractSVGProps, stripSVG } from './util';


export default class InlineSVG extends React.Component {

    render() {
        let Element, __html, svgProps;
        const { element, raw, src, ...otherProps } = this.props;

        if (raw === true) {
            Element = 'svg';
            svgProps = extractSVGProps(src);
            __html = getSVGFromSource(src).innerHTML;
        }
        __html = __html || src;
        Element = Element || element;
        svgProps = svgProps || {};

        return <Element {...svgProps} {...otherProps} src={null} children={null}
                        dangerouslySetInnerHTML={{ __html }} />
    }
}

InlineSVG.defaultProps = {
    element: 'i',
    raw: false,
    src: ''
}

InlineSVG.propTypes = {
    src: string.isRequired,
    element: string,
    raw: bool
}
