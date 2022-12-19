import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
import { CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';
import './ConfirmModal.scss'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ConfirmModal extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        let specialty = this.props.currentSpecialty;
        if (specialty && !_.isEmpty(specialty)) {
            this.setState({
                id : specialty.id,
                name: specialty.name,
                imageBase64: specialty.imageBase64,
                descriptionHTML: specialty.descriptionHTML,
                descriptionMarkdown: specialty.descriptionMarkdown,
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    };


    render() {
        let {isOpenModal, dataModal, sendConfirm} = this.props;
        return (
            <Modal 
                isOpen={isOpenModal}
                toggle={()=>{this.toggle()}}
                className={'confirm-modal'}
                size="lg"
                centered
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "doctor.appointment-manage.modal-title"/></ModalHeader>
                <ModalBody> 
                    <div className='row'>
                        <div className='form-group col-6'>
                                <label>Email:</label>
                                <input className='form-control' type='email' value={dataModal.email}></input>
                        </div>
                        <div className='form-group col-6'>
                                <label>Hoa don:</label>
                                <input className='form-control-file' type='file'></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary px-3" 
                        onClick={sendConfirm}
                    ><FormattedMessage id = "doctor.appointment-manage.confirm"/></Button>{' '}
                    <Button color="secondary px-3" onClick={()=>{this.toggle()}}><FormattedMessage id = "doctor.appointment-manage.cancel"/></Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);




