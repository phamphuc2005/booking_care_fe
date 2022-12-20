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
            email: '',
            fileBase64: ''
        }
    }

    componentDidMount() {
        if(this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeFile = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                fileBase64: base64
            })
        }
    }

    handleSendConfirm = () => {
        this.props.sendConfirm(this.state)
    }

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
                                <input className='form-control' type='email' value={this.state.email}
                                    onChange={(event)=>this.handleOnChangeEmail(event)}
                                ></input>
                        </div>
                        <div className='form-group col-6'>
                                <label>Hoa don:</label>
                                <input className='form-control-file' type='file'
                                    onChange={(event)=>this.handleOnChangeFile(event)}
                                ></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary px-3" 
                        onClick={()=>this.handleSendConfirm()}
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




