import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
import { CommonUtils } from '../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';
import './ConfirmRegisterModal.scss'

class ConfirmRegisterModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            random_number: '',
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeCode = (event) => {
        this.setState({
            random_number: event.target.value
        })
    }

    handleSendConfirm = () => {
        this.props.sendConfirm(this.state.random_number)
    }

    render() {
        let {isOpenModal} = this.props;
        return (
            <Modal 
                isOpen={isOpenModal}
                toggle={()=>{this.toggle()}}
                className={'confirm-register-modal'}
                size="lg"
                centered
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "register.modal-content"/></ModalHeader>
                <ModalBody> 
                    <div className='row'>
                        <div className='form-group col-12'>
                                <label><FormattedMessage id = "register.modal-label"/>:</label>
                                <input className='form-control' type=''
                                    onChange={(event)=>this.handleOnChangeCode(event)}
                                ></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary px-3" 
                        onClick={()=>this.handleSendConfirm()}
                    ><FormattedMessage id = "register.confirm"/></Button>{' '}
                    <Button color="secondary px-3" onClick={()=>{this.toggle()}}><FormattedMessage id = "register.cancel"/></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRegisterModal);




