import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../../containers/Header/Header';
import { FormattedMessage } from 'react-intl';
import './AppointmentSchedule.scss';
import * as actions from '../../../store/actions';
import {LANGUAGES, dateFormat} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import {getListScheduleForPatient, cancelAppointment} from '../../../services/userService';
import { toast } from 'react-toastify';
import ModalCancelAppointment from './ModalCancelAppointment';

class AppointmentSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSchedule: [],
            appointmentCancel: {},
            isOpenCancel: false,
        }
    }    

    async componentDidMount() {
        this.getListSchedule()
    }

    getListSchedule = async() => {
        let {user} = this.props;
        let res = await getListScheduleForPatient({
            patientId: user.id,
        })
        if(res && res.errCode === 0){
            this.setState({
                dataSchedule: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    toggleCancelModal = () => {
        this.setState({
            isOpenCancel: !this.state.isOpenCancel,
        })
    }

    handleCancelAppointment = (appointment) => {
        this.setState({
            isOpenCancel: true,
            appointmentCancel: appointment
        })
    }

    doCancelAppointment = async (appointment) => {
        try {
            let res = await cancelAppointment({id: appointment.id});
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenCancel: false,
                })
                toast.success("Hủy đăng ký thành công !");
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage)
            }
        } catch (error) {
            toast.error("Hủy đăng ký không thành công !");
            console.log('Error:', error)
        }
    }

    render() {
        let {dataSchedule} = this.state;
        let {language} = this.props;
        return (
            <>
                {
                    this.state.isOpenCancel &&
                    <ModalCancelAppointment
                        isOpen = {this.state.isOpenCancel}
                        toggleFromParent = {this.toggleCancelModal}
                        currentAppointment = {this.state.appointmentCancel}
                        cancelAppointmentModal = {this.doCancelAppointment} 
                    />
                }
                <div className='patient-appointment-container'>
                    <div className='title patient-manage-title'>
                        <FormattedMessage id = "patient-manage.schedule-title"/>
                    </div>
                    <div className='container'>
                        <div className='row background'>
                            <div className='col-12 table-list'>
                                <table id="table-schedule" className='col-12'>
                                    <tbody>
                                        <tr>
                                            <th style={{width: '5%'}}>ID</th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "patient-manage.date"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "patient-manage.hour"/></th>
                                            <th style={{width: '20%'}}><FormattedMessage id = "patient-manage.doctor"/></th>
                                            <th style={{width: '30%'}}><FormattedMessage id = "patient-manage.clinic"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "patient-manage.action"/></th>
                                        </tr>
                                        {dataSchedule && dataSchedule.length>0 ? 
                                            dataSchedule.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeData2.valueVi : item.timeTypeData2.valueEn
                                                let date = language === LANGUAGES.VI ? 
                                                    this.capitalizeFirstLetter(moment.unix(+item.date / 1000).format('dddd , DD/MM/YYYY')) : 
                                                    moment.unix(+item.date / 1000).locale('en').format('dddd , MM/DD/YYYY');

                                                return(
                                                    <tr
                                                        className='patient-row'
                                                        key={index} style={{textAlign: 'center'}}
                                                    >
                                                        <td >{item.id}</td>
                                                        <td>{date}</td>
                                                        <td>{time}</td>
                                                        <td>{`${item.doctorData2.firstName} ${item.doctorData2.lastName}`}</td>
                                                        <td>{language === LANGUAGES.VI ? item.doctorData2.Doctor_Info.Clinic.name : item.doctorData2.Doctor_Info.Clinic_En.name_en}</td>
                                                        <td>
                                                            <div 
                                                                className='btn btn-warning action'
                                                                onClick={()=>this.handleCancelAppointment(item)}
                                                            >
                                                                <FormattedMessage id = "patient-manage.cancel"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : 
                                            <tr className='no-data'>
                                                <td colSpan={6}><FormattedMessage id = "doctor.patient-manage.no-data"/></td>
                                            </tr>
                                        }

                                    </tbody>                 
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSchedule);
