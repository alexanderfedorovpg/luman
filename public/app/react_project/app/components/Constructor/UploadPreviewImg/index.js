/**
 * Created by Frimko on 19.06.2017.
 * mailto ccc-car@yandex.ru.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as api from 'api'
import { connect } from 'react-redux';
import { showPreloader, hidePreloader } from 'containers/App/actions';

import styled from 'styled-components';
import ContentModal from 'components/Modal/ContentModal';
import Image from './Image';
import Form from './Form';

const Root = styled.div`
    height: 40px;
    width:100%;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: #f3f3f4;
    }
    
`
const Text = styled.span`
    margin-left: 20px;
    cursor: pointer;
    &:hover {
        opacity: .5;
    }
`

class UploadPreviewImg extends Component {
    constructor(props) {
        super(props);
        this.state = {modalOpen: false};
    }

    openModal = () => this.setState({modalOpen: true});
    closeModal = () => this.setState({modalOpen: false});

    uploadFile(f, cb) {
        this.props.showPreloader();
        return api.uploadFile(f).then((res) => {
            let json = res.data;
            let id = json.file.id;
            if(id){
                api.uploadCoverImg(id).then((resCover) => {
                    let json = resCover.data;
                    cb(json.url);
                    this.props.hidePreloader();
                })
            }
        })
    }

    handleSubmit = (data) => {
        let img = data.toJS().preview[0];
        this.uploadFile(img, (url)=>{
            this.props.updateCoverImg({url: url})
            this.closeModal();
        });
    }

    render() {
        return (
            <Root title="Изменить обложку" onClick={this.openModal}>
                <Image srcImg={this.props.srcImg}/>
                <Text>Обложка "Ваш персональный ведущий"</Text>
                <ContentModal
                    title="Загрузка превью картинки"
                    contentLabel="Изменить превью-картинку"
                    isOpen={this.state.modalOpen}
                    onRequestClose={this.closeModal}>
                    <Form onSubmit={this.handleSubmit}/>
                </ContentModal>
            </Root>
        );
    }
}
UploadPreviewImg.propTypes = {
    srcImg: PropTypes.string,
    updateCoverImg: PropTypes.func,
};

export default connect(null, { showPreloader, hidePreloader })(UploadPreviewImg)