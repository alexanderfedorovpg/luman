import React, {PureComponent} from 'react'
import { ensureAbs } from '../shared/uri'
import defaultPic from './1.png'

class Img extends PureComponent{
    constructor(props){
        super(props);
        this.state = {src: ''}
    }
    loadImage(){
        let src;
        if(typeof this.props.src === 'string' || !this.props.src){
            src = this.props.src ? ensureAbs(this.props.src) : defaultPic
            this.setState({src: src});
        }else{
            this.getBase64(this.props.src, (src) => (this.setState({src: src})))
        }
    }
    componentDidMount(){
        this.loadImage();
    }
    componentDidUpdate(){
        this.loadImage();
    }
    getBase64(file, callBack) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callBack(reader.result);
        }
    }
    render() {
        return <img {...this.props} src={this.state.src} />
    }
}

export default Img
