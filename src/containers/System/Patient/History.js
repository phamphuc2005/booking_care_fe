import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../../containers/Header/Header';
import { FormattedMessage } from 'react-intl';
import './History.scss';
import * as actions from '../../../store/actions';
import {LANGUAGES, dateFormat} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import {getHistory} from '../../../services/userService';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSchedule: [],
        }
    }    

    async componentDidMount() {
        this.getListSchedule()
    }

    getListSchedule = async() => {
        let {user} = this.props;
        let res = await getHistory({
            patientId: user.id,
        })
        if(res && res.errCode === 0){
            this.setState({
                dataSchedule: res.data
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

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let {dataSchedule} = this.state;
        let {language} = this.props;
        // console.log(this.state, this.props.user)
        return (
            <>
                <div className='patient-history-container'>
                    <div className='title patient-manage-title'>
                        <FormattedMessage id = "patient-manage.history-title"/>
                    </div>
                    <div className='container'>
                        <div className='row background'>
                            <div className='col-12 table-list'>
                                <table id="table-history" className='col-12'>
                                    <tbody>
                                        <tr>
                                            <th style={{width: '5%'}}>ID</th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "patient-manage.date"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "patient-manage.hour"/></th>
                                            <th style={{width: '20%'}}><FormattedMessage id = "patient-manage.doctor"/></th>
                                            <th style={{width: '30%'}}><FormattedMessage id = "patient-manage.clinic"/></th>
                                            <th style={{width: '15%'}}><FormattedMessage id = "patient-manage.status"/></th>
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
                                                        <td>{item.doctorData2.Doctor_Info.nameClinic}</td>
                                                        <td>
                                                            <div className='status'><FormattedMessage id = "patient-manage.examined"/></div>
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
                {/* <PatientModal
                    isOpenModal={isOpenModal}
                    dataModal={dataModal}
                    toggleFromParent = {this.toggleModal}
                /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(History);
