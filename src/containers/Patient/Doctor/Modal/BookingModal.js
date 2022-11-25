import React, { Component } from 'react';
import { connect } from "react-redux";
import {LANGUAGES} from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.language !== prevProps.language) {
        //     let allDates = this.getArrDates(this.props.language);
        //     this.setState({
        //         allDates: allDates
        //     })
        // }
    }

    render() {
        let {isOpenModal, closeBookingModal, dataTime} = this.props;
        // let doctorId = '';
        // if(dataTime && !_.isEmpty(dataTime)) {
        //     doctorId = dataTime.doctorId
        // }
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'}>
                <div className='booking-modal-content'>
                    <div className='header'>
                        <span className='left'><FormattedMessage id = "patient.booking-modal.title"/></span>
                        <span 
                            className='right'
                            onClick={closeBookingModal}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className='body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor doctorId={doctorId}/>
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.who"/>:</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.name"/>:</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.gender"/>:</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.phone"/>:</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email:</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.address"/>:</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.reason"/>:</label>
                                <input className='form-control'></input>
                            </div>
                        </div>
                    </div>
                    <div className='footer'>
                        <button className='btn btn-confirm'><FormattedMessage id = "patient.booking-modal.confirm-btn"/></button>
                        <button 
                            className='btn btn-cancel'
                            onClick={closeBookingModal}
                        >
                            <FormattedMessage id = "patient.booking-modal.cancel-btn"/>
                        </button>
                    </div>
                </div>
            </Modal>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
