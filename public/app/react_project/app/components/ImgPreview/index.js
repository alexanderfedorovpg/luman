import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'utils/style';

const Img = styled.img`
    max-width: 100%;
    max-height: 100%;

    ${ifProp('cover')`
        @supports(object-fit: cover) {
            width: 100%;
            height: 100%;

            object-fit: cover;
        }
    `}
`;

class ImgPreview extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            src: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
        };
    }

    componentWillMount() {
        this.parseImg(this.props.img);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.img !== this.props.img) {
            this.parseImg(newProps.img);
        }
    }

    parseImg(img) {
        if (typeof img === 'string') {
            this.setState({ src: img });
            return;
        }

        const reader = new FileReader();
        reader.onload = () => this.setState({ src: reader.result });

        reader.readAsDataURL(img);
    }

    render() {
        const { img, ...props } = this.props;
        return <Img src={this.state.src} {...props} />;
    }
}

ImgPreview.defaultProps = {
    alt: '',
};

ImgPreview.propTypes = {
    img: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]).isRequired,
    alt: PropTypes.string,
};

export default ImgPreview;
