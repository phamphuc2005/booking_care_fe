import React, { Component } from 'react';
import { connect } from "react-redux";
import {LANGUAGES} from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import {postPatientBooking} from '../../../../services/userService';
import {toast} from 'react-toastify';
import moment from 'moment/moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            birthday: '',
            selectGender: '',
            genders: '',
            email: '',
            address: '',
            reason: '',
            doctorID: '',
            timeType: ''
        }
    }

    async componentDidMount() {
        this.props.getGender();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if(data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }
    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.dataTime !== prevProps.dataTime) {
            let doctorId = this.props.dataTime && !_.isEmpty(this.props.dataTime) ? this.props.dataTime.doctorId : '';
            let timeType = this.props.dataTime.timeType;
            this.setState({
                doctorID: doctorId,
                timeType: timeType
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let copyState = {...this.state};
        copyState[id] = valueInput;
        this.setState({
            ...copyState
        })
    }

    handleChangeBirthday = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeGender = (selectOption) => {
        this.setState({selectGender: selectOption})
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildBookingTime(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBooking({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            date: date,
            selectGender: this.state.selectGender.value,
            genders: this.state.genders,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            doctorId: this.state.doctorID,
            timeType: this.state.timeType,
            language:this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        if(res && res.errCode === 0) {
            toast.success("Successful appointment booking!");
            this.props.closeBookingModal();
        } else {
            toast.error("Failed to book an appointment!");
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildBookingTime = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? 
                this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd , DD/MM/YYYY')) : 
                moment.unix(+dataTime.date / 1000).locale('en').format('dddd , MM/DD/YYYY');
            
            return `${time} , ${date}`
        }
        return ''
    }

    buildDoctorName = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
            `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}` : 
            `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
            
            return name;
        }
        return ''
    }

    render() {
        let {isOpenModal, closeBookingModal, dataTime, language} = this.props;
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
                            <ProfileDoctor 
                                doctorId={doctorId}
                                isShowDescription={false}
                                dataTime={dataTime}    
                                isShowLink={false}
                                isShowPrice={true}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.name"/>:</label>
                                <input 
                                    className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event)=>this.handleOnChangeInput(event, 'fullName')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.phone"/>:</label>
                                <input 
                                    className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event)=>this.handleOnChangeInput(event, 'phoneNumber')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.birthday"/>:</label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleChangeBirthday}
                                    value={this.state.birthday}
                            />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.gender"/>:</label>
                                <Select
                                    value={this.state.selectGender}
                                    onChange={this.handleChangeGender}
                                    options={this.state.genders}
                                    placeholder={<FormattedMessage id = "patient.booking-modal.choose-gender"/>}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email:</label>
                                <input 
                                    className='form-control'
                                    value={this.state.email}
                                    onChange={(event)=>this.handleOnChangeInput(event, 'email')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.address"/>:</label>
                                <input 
                                    className='form-control'
                                    value={this.state.address}
                                    onChange={(event)=>this.handleOnChangeInput(event, 'address')}
                                ></input>
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id = "patient.booking-modal.reason"/>:</label>
                                <input 
                                    className='form-control'
                                    value={this.state.reason}
                                    onChange={(event)=>this.handleOnChangeInput(event, 'reason')}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className='footer'>
                        <button 
                            className='btn btn-confirm'
                            onClick={this.handleConfirmBooking}
                        ><FormattedMessage id = "patient.booking-modal.confirm-btn"/></button>
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
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
