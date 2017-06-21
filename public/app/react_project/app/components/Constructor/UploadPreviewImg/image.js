/**
 * Created by Frimko on 19.06.2017.
 * mailto ccc-car@yandex.ru.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const ShowBox = styled.div`
    position: absolute;
    top: 60px;
    left: 60px;
    z-index: 200;
    height: 400px;
    width: 400px;
    img{
        max-width: 100%;
        max-height: 100%;
    }
`
const ImgWrap = styled.span`
    height: 40px;
    width: 40px;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #c4c4c4;
    text-align: center;
    border: 1px solid rgba(204, 204, 204, 0.74);
    border-color: #837878;
    &:hover {
        opacity: .5;
    }
    img{
        max-width: 100%;
        max-height: 100%;
    }
`


class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {showPreview: false};
    }

    showPreview = ()=> this.setState({showPreview: true})
    hidePreview = ()=> this.setState({showPreview: false})

    render() {
        const {srcImg} = this.props;
        return (
            <div>
                { this.state.showPreview && <ShowBox> <div><img src={srcImg} alt=""/></div> </ShowBox> }
                <ImgWrap onMouseEnter={this.showPreview} onMouseLeave={this.hidePreview}>
                    <img src={srcImg} alt=""/>
                </ImgWrap>
            </div>
        )
    }
}

Image.propTypes = {
    srcImg: PropTypes.string,
};

export default Image;