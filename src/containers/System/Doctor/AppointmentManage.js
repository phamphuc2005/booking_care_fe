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
import {saveDoctorSchedule} from '../../../services/userService'

class AppointmentManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }    

    componentDidMount() {

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
        })
    }

    render() {
        return (
            <div className='appointment-manage-container'>
                <div className='title appointment-manage-title'>
                    <FormattedMessage id = "doctor.appointment-manage-title"/>
                </div>
                <div className='container'>
                    <div className='row background'>
                        <div className='col-3 form-group'>
                            <label>Chọn thời gian:</label>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleChangeDate}
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='table-title col-12 mb-2'>-- <FormattedMessage id="specialty-manage.list-title"/> --</div>
                        <div className='col-12 table-list'>
                            <table id="table-appointment" className='col-12'>
                                <tbody>
                                    <tr>
                                        <th style={{width: '10%'}}><FormattedMessage id="specialty-manage.picture"/></th>
                                        <th style={{width: '50%'}}><FormattedMessage id="specialty-manage.name"/></th>
                                        <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.edit"/></th>
                                        <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.delete"/></th>
                                    </tr>
                                    {/* {dataSpecialty && dataSpecialty.length>0 && 
                                        dataSpecialty.map((item, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>
                                                        <div 
                                                            className='background-img img-specialty'
                                                            style={{backgroundImage: `url(${item.image})`}}
                                                        >
                                                        </div>
                                                    </td>
                                                    <td style={{textAlign: 'center', fontWeight: '600'}}>{item.name}</td>
                                                    <td className='edit text-center'>
                                                        <button 
                                                            className='edit-btn' 
                                                            onClick={()=>this.handleEditSpecialty(item)}
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
                                                    </td>
                                                    <td className='delete text-center'>
                                                        <button 
                                                            className='delete-btn'
                                                            onClick={()=>this.handleDeleteSpecialty(item)} 
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    } */}

                                </tbody>                 
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allTime: state.admin.allTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllcodeTime: () => dispatch(actions.fetchAllcodeTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentManage);
