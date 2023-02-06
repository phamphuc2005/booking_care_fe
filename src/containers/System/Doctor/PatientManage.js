import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../../containers/Header/Header';
import { FormattedMessage } from 'react-intl';
import './PatientManage.scss';
import * as actions from '../../../store/actions';
import {LANGUAGES, dateFormat} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import {getListPatientForDoctor} from '../../../services/userService';
import PatientModal from './PatientModal';
import LoadingOverlay from 'react-loading-overlay';

class PatientManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenModal: false,
            dataModal: {},
            isLoading: false
        }
    }    

    async componentDidMount() {
        this.getDataPatient()
    }

    getDataPatient = async() => {
        let {user} = this.props;
        let {currentDate} = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
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
        }, async () => {
            await this.getDataPatient()
        })
    }

    toggleModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    handlePatientModal = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            appointmentId: item.id,
            email: item.patientData.email,
            timeTypeVi: item.timeTypeData2.valueVi,
            timeTypeEn: item.timeTypeData2.valueEn,
            patientName: `${item.patientData.firstName} ${item.patientData.lastName}`,
            genderVi: item.patientData.genderData.valueVi,
            genderEn: item.patientData.genderData.valueEn,
            phonenumber: item.patientData.phonenumber,
            address: item.patientData.address
        }
        this.setState({
            isOpenModal: true,
            dataModal:data
        })
        console.log('state',data)
    }

    render() {
        let {dataPatient, isOpenModal, dataModal} = this.state;
        let {language} = this.props;
        console.log(this.state)
        return (
            <>
                <div className='patient-manage-container'>
                    <div className='title patient-manage-title'>
                        <FormattedMessage id = "doctor.patient-manage.title"/>
                    </div>
                    <div className='container'>
                        <div className='row background'>
                            <div className='col-3 form-group'>
                                <label><FormattedMessage id = "doctor.patient-manage.choose-date"/>:</label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleChangeDate}
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className='table-title col-12 mb-2'>-- <FormattedMessage id = "doctor.patient-manage.table-title"/> --</div>
                            <div className='col-12 table-list'>
                                <table id="table-patient" className='col-12'>
                                    <tbody>
                                        <tr>
                                            <th style={{width: '20%'}}><FormattedMessage id = "doctor.patient-manage.patientId"/></th>
                                            <th style={{width: '40%'}}><FormattedMessage id = "doctor.patient-manage.name"/></th>
                                            <th style={{width: '40%'}}><FormattedMessage id = "doctor.patient-manage.time"/></th>
                                        </tr>
                                        {dataPatient && dataPatient.length>0 ? 
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeData2.valueVi : item.timeTypeData2.valueEn
                                                // let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                return(
                                                    item.patientData != null ?
                                                    <tr
                                                        className='patient-row'
                                                        key={index} style={{textAlign: 'center'}}
                                                        onClick={()=>this.handlePatientModal(item)}
                                                    >
                                                        <td >{item.patientId}</td>
                                                        <td>{`${item.patientData.firstName} ${item.patientData.lastName}`}</td>
                                                        <td>{time}</td>
                                                    </tr> : <></>
                                                )
                                            }) : 
                                            <tr className='no-data'>
                                                <td colSpan={7}><FormattedMessage id = "doctor.patient-manage.no-data"/></td>
                                            </tr>
                                        }

                                    </tbody>                 
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <PatientModal
                    isOpenModal={isOpenModal}
                    dataModal={dataModal}
                    toggleFromParent = {this.toggleModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientManage);
