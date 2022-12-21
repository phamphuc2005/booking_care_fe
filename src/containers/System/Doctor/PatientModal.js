import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
import { CommonUtils, LANGUAGES } from '../../../utils';
import 'react-markdown-editor-lite/lib/index.css';
import './PatientModal.scss'

class PatientModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            fileBase64: '',
            patientName: '',
            patientId: '',
            appointmentId: '',
            genderVi: '',
            genderEn: '',
            phonenumber: '',
            address: '',
            timeVi: '',
            timeEn: ''
        }
    }

    componentDidMount() {
        if(this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                patientName: this.props.dataModal.patientName,
                patientId: this.props.dataModal.patientId,
                appointmentId: this.props.dataModal.appointmentId,
                timeVi: this.props.dataModal.timeTypeVi,
                timeEn: this.props.dataModal.timeTypeEn,
                genderVi: this.props.dataModal.genderVi,
                genderEn: this.props.dataModal.genderEn,
                phonenumber: this.props.dataModal.phonenumber,
                address: this.props.dataModal.address,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email,
                patientName: this.props.dataModal.patientName,
                patientId: this.props.dataModal.patientId,
                appointmentId: this.props.dataModal.appointmentId,
                timeVi: this.props.dataModal.timeTypeVi,
                timeEn: this.props.dataModal.timeTypeEn,
                genderVi: this.props.dataModal.genderVi,
                genderEn: this.props.dataModal.genderEn,
                phonenumber: this.props.dataModal.phonenumber,
                address: this.props.dataModal.address,
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    render() {
        let {isOpenModal, dataModal, sendConfirm, language} = this.props;
        let time = language === LANGUAGES.VI ? this.state.timeVi : this.state.timeEn
        let gender = language === LANGUAGES.VI ? this.state.genderVi : this.state.genderEn
        return (
            <Modal 
                isOpen={isOpenModal}
                toggle={()=>{this.toggle()}}
                className={'patient-modal'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "doctor.patient-manage.modal-title"/></ModalHeader>
                <ModalBody> 
                    <div className='row'>
                        <div className='form-group col-12'>
                            <label><FormattedMessage id = "doctor.patient-manage.patientId"/>:</label>
                            <input className='' disabled={true} type='text' value={this.state.patientId}
                            ></input>
                        </div>
                        <div className='form-group col-12'>
                            <label><FormattedMessage id = "doctor.patient-manage.appointmentId"/>:</label>
                            <input className='' disabled={true} type='text' value={this.state.appointmentId}
                            ></input>
                        </div>
                        <div className='form-group col-12'>
                            <label><FormattedMessage id = "doctor.patient-manage.name"/>:</label>
                            <input className='' disabled={true} type='text' value={this.state.patientName}
                            ></input>
                        </div>
                        <div className='form-group col-12'>
                            <label><FormattedMessage id = "doctor.patient-manage.time"/>:</label>
                            <input className='' disabled={true} type='text' value={time}
                            ></input>
                        </div>
                        <div className='form-group col-12'>
                            <label>Email:</label>
                            <input className='' disabled={true} type='email' value={this.state.email}
                            ></input>
                        </div>
                        <div className='form-group col-12'>
                            <label><FormattedMessage id = "doctor.patient-manage.gender"/>:</label>
                            <input className='' disabled={true} type='text' value={gender}
                            ></input>
                        </div>
                        <div className='form-group col-12'>
                            <label><FormattedMessage id = "doctor.patient-manage.phone"/>:</label>
                            <input className='' disabled={true} type='text' value={this.state.phonenumber}
                            ></input>
                        </div>
                        <div className='form-group col-12'>
                            <label><FormattedMessage id = "doctor.patient-manage.address"/>:</label>
                            <input className='' disabled={true} type='text' value={this.state.address}
                            ></input>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientModal);




