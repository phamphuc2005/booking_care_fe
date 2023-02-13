import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../../containers/Header/Header';
import { FormattedMessage } from 'react-intl';
import './AppointmentManage.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import {LANGUAGES, dateFormat} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import {toast} from 'react-toastify'
import _ from 'lodash';
import {getListAppointmentForDoctor, postSendConfirm, confirmCancel} from '../../../services/userService';
import ConfirmModal from './ConfirmModal';
import LoadingOverlay from 'react-loading-overlay';
import ModalConfirmCancel from './ModalConfirmCancel';

class AppointmentManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataAppointment: [],
            isOpenModal: false,
            dataModal: {},
            isLoading: false,
            appointmentCancel: {},
            isOpenCancel: false,
            date: '',
            today: moment(new Date()).startOf('day').valueOf()
        }
    }    

    async componentDidMount() {
        this.getDataAppointment()
    }

    getDataAppointment = async() => {
        let {user} = this.props;
        let {currentDate} = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getListAppointmentForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataAppointment: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleChangeDate = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataAppointment()
        })
    }

    handleConfirm = (item) => {
        this.setState({
            date: item.date
        })
        setTimeout(function(){
            if(this.state.today < +this.state.date) {
                toast.warn('Chưa đến lịch khám! Chưa thể xác nhận!')
            } else {
                let data = {
                    doctorId: item.doctorId,
                    patientId: item.patientId,
                    email: item.patientData.email,
                    timeType: item.timeType,
                    patientName: item.patientData.firstName
                }
                this.setState({
                    isOpenModal: true,
                    dataModal:data,
                })
            }
        }.bind(this), 1000);
    }

    toggleModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    sendConfirm = async (dataFromModal) => {
        let {dataModal} = this.state;
        this.setState({
            isLoading: true
        })
        let res = await postSendConfirm({
            email: dataFromModal.email,
            fileBase64: dataFromModal.fileBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if(res && res.errCode === 0) {
            this.setState({
                isLoading: false
            })
            toast.success('Confirm successful!');
            this.toggleModal();
            await this.getDataAppointment();
        } else {
            this.setState({
                isLoading: false
            })
            toast.error('Confirm failed!');
            console.log("Error:", res.errMessage)
        }
    }

    toggleCancelModal = () => {
        this.setState({
            isOpenCancel: !this.state.isOpenCancel,
        })
    }

    handleConfirmCancel = (appointment) => {
        this.setState({
            date: appointment.date
        })
        setTimeout(function(){
            if(this.state.today < +this.state.date) {
                toast.warn('Chưa đến lịch khám! Chưa thể hủy!')
            } else {
                this.setState({
                    isOpenCancel: true,
                    appointmentCancel: appointment
                })
            }
        }.bind(this), 1000);
    }

    doConfirmCancel = async (appointment) => {
        try {
            let res = await confirmCancel({id: appointment.id});
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenCancel: false,
                })
                toast.success("Hủy lịch khám thành công !");
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage)
            }
        } catch (error) {
            toast.error("Hủy lịch khám không thành công !");
            console.log('Error:', error)
        }
    }

    render() {
        let {dataAppointment, isOpenModal, dataModal} = this.state;
        let {language} = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Loading...'
                    >
                    <div className='appointment-manage-container'>
                    <div className='title appointment-manage-title'>
                        <FormattedMessage id = "doctor.appointment-manage.title"/>
                    </div>
                    <div className='container'>
                        <div className='row background'>
                            <div className='col-3 form-group'>
                                <label><FormattedMessage id = "doctor.appointment-manage.choose-date"/>:</label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleChangeDate}
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className='table-title col-12 mb-2'>-- <FormattedMessage id = "doctor.appointment-manage.table-title"/> --</div>
                            <div className='col-12 table-list'>
                                <table id="table-appointment" className='col-12'>
                                    <tbody>
                                        <tr>
                                            <th style={{width: '5%'}}><FormattedMessage id = "doctor.appointment-manage.number"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "doctor.appointment-manage.time"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "doctor.appointment-manage.name"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "doctor.appointment-manage.gender"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "doctor.appointment-manage.phone"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "doctor.appointment-manage.address"/></th>
                                            <th style={{width: '10%'}}><FormattedMessage id = "doctor.appointment-manage.confirm"/></th>
                                            <th style={{width: '10%'}}><FormattedMessage id = "doctor.appointment-manage.cancel"/></th>
                                        </tr>
                                        {dataAppointment && dataAppointment.length>0 ? 
                                            dataAppointment.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeData2.valueVi : item.timeTypeData2.valueEn
                                                return(
                                                    item.patientData != null ?
                                                        <tr key={index} style={{textAlign: 'center'}}>
                                                        <td >{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn}</td>
                                                        <td>{item.patientData.phonenumber}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td className='confirm text-center'>
                                                            <button 
                                                                className='btn btn-warning confirm-btn' 
                                                                onClick={()=>this.handleConfirm(item)}
                                                            >
                                                                <FormattedMessage id = "doctor.appointment-manage.confirm"/>
                                                            </button>
                                                        </td>
                                                        <td className='cancel text-center'>
                                                            <button 
                                                                className='btn btn-secondary cancel-btn' 
                                                                onClick={()=>this.handleConfirmCancel(item)}
                                                            >
                                                                <FormattedMessage id = "doctor.appointment-manage.cancel"/>
                                                            </button>
                                                        </td>
                                                    </tr> : <></>                                                                        
                                                )
                                            }) : 
                                            <tr className='no-data'>
                                                <td colSpan={8}><FormattedMessage id = "doctor.appointment-manage.no-data"/></td>
                                            </tr>
                                        }

                                    </tbody>                 
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmModal
                    isOpenModal={isOpenModal}
                    dataModal={dataModal}
                    toggleFromParent = {this.toggleModal}
                    sendConfirm={this.sendConfirm}
                />
                {
                    this.state.isOpenCancel &&
                    <ModalConfirmCancel
                        isOpen = {this.state.isOpenCancel}
                        toggleFromParent = {this.toggleCancelModal}
                        currentAppointment = {this.state.appointmentCancel}
                        confirmCancelModal = {this.doConfirmCancel} 
                    />
                }
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
        // isLoggedIn: state.user.isLoggedIn,
        // allDoctors: state.admin.allDoctors,
        // allTime: state.admin.allTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllcodeTime: () => dispatch(actions.fetchAllcodeTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentManage);
