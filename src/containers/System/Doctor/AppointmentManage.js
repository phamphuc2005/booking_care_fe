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
import {getListAppointmentForDoctor} from '../../../services/userService';
import ConfirmModal from './ConfirmModal';

class AppointmentManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataAppointment: [],
            isOpenModal: false,
            dataModal: {}
        }
    }    

    async componentDidMount() {
        let {user} = this.props;
        let {currentDate} = this.state;
        let formattedDate = new Date(currentDate).getTime();

        this.getDataAppointment(user, formattedDate)
    }

    getDataAppointment = async(user, formattedDate) => {
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
        // if(prevProps.language !== this.props.language){
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }

    handleChangeDate = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let {user} = this.props;
            let {currentDate} = this.state;
            let formattedDate = new Date(currentDate).getTime();

            this.getDataAppointment(user, formattedDate)
        })
    }

    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email
        }
        this.setState({
            isOpenModal: true,
            dataModal:data
        })
    }

    toggleModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    sendConfirm = () => {
        alert('click me')
    }

    render() {
        let {dataAppointment, isOpenModal, dataModal} = this.state;
        let {language} = this.props;
        console.log(this.state)
        return (
            <>
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
                                            <th style={{width: '20%'}}><FormattedMessage id = "doctor.appointment-manage.name"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "doctor.appointment-manage.gender"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "doctor.appointment-manage.phone"/></th>
                                            <th style={{width: '20%'}}><FormattedMessage id = "doctor.appointment-manage.address"/></th>
                                            <th style={{width: '10%'}}><FormattedMessage id = "doctor.appointment-manage.confirm"/></th>
                                        </tr>
                                        {dataAppointment && dataAppointment.length>0 ? 
                                            dataAppointment.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeData2.valueVi : item.timeTypeData2.valueEn
                                                let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                return(
                                                    <tr key={index} style={{textAlign: 'center'}}>
                                                        <td >{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{gender}</td>
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
                                                    </tr>
                                                )
                                            }) : 
                                            <div className='no-data'><FormattedMessage id = "doctor.appointment-manage.no-data"/></div>
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