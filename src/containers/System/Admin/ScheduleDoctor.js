import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../../containers/Header/Header';
import { FormattedMessage } from 'react-intl';
import './ScheduleDoctor.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import {LANGUAGES, dateFormat} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import {toast} from 'react-toastify'
import _ from 'lodash';
import {saveDoctorSchedule} from '../../../services/userService'
import ListSchedule from '../Doctor/ListSchedule';

class ScheduleDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            time: [],
            maxNumber: ''
        }
    }    

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllcodeTime();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length>0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.lastName} ${item.firstName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allTime !== this.props.allTime){
            let data = this.props.allTime;
            if(data && data.length>0) {
                data = data.map(item => ({...item, isSelected: false}))
            }
            this.setState({
                time: data
            })
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        
    };

    handleChangeDate = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (times) => {
        let {time} = this.state;
        if(time && time.length>0) {
            time = time.map(item => {
                if(item.id === times.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            this.setState({
                time: time
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSaveTime = async () => {
        let {selectedDoctor, currentDate, time} = this.state;
        let result = []
        if(selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.warning("Thiếu bác sĩ!");
            return;
        }
        if(!currentDate) {
            toast.warning("Thiếu ngày tháng!");
            return;
        }
        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // let formatDate = moment(currentDate).unix();
        let formatDate = new Date(currentDate).getTime();
        if(time && time.length>0) {
            let selectedTime = time.filter(item=>item.isSelected === true)
            if(selectedTime && selectedTime.length>0) {
                selectedTime.map(timess => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatDate;
                    object.timeType = timess.keyMap;
                    result.push(object);
                })
            } else {
                toast.warning("Thiếu thời gian!");
                return;
            }
        }
        let res = await saveDoctorSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatDate,
            maxNumber: this.state.maxNumber
        })
        if(res && res.errCode === 0) {
            toast.success("Tạo kế hoạch thành công!");
        } else {
            toast.error("Tạo kế hoạch thất bại!");
            console.log('error:', res)
        }
    }

    render() {
        let {time} = this.state;
        let {language} = this.props;
        let today = new Date(new Date().setDate(new Date().getDate()));
        let choose = language === LANGUAGES.VI ? 'Chọn' : 'Choose option'

        return (
            <div className='schedule-manage-container'>
                <div className='title schedule-manage-title'>
                    <FormattedMessage id = "schedule-manage.title"/>
                </div>
                <div className='container'>
                    <div className='row background'>
                        <div className='col-2 form-group'>
                            <label><FormattedMessage id = "schedule-manage.choose-title"/>:</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={<FormattedMessage id = "schedule-manage.choose-title"/>}
                            />
                        </div>
                        <div className='col-2 form-group'>
                            <label><FormattedMessage id = "schedule-manage.choose-day"/>:</label>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleChangeDate}
                                value={this.state.currentDate}
                                minDate={today}
                            />
                        </div>
                        <div className='col-3 form-group'>
                            <label><FormattedMessage id = "schedule-manage.max"/>:</label>
                            <select 
                                className='form-control'
                                name="maxNumber" 
                                onChange={(event)=>{this.handleOnChangeInput(event, "maxNumber")}}
                                value={this.state.maxNumber}>
                                <option value="">-- {choose} --</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">5</option>
                            </select>
                        </div>
                        <div className='col-12 form-group hour-container'>
                            {time && time.length>0 &&
                                time.map((item, index) => {
                                    return (
                                        <button 
                                            className={item.isSelected === true ? 'btn btn-hour active' : 'btn btn-hour' }
                                            key={index}
                                            onClick={()=>this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button 
                                className='btn btn-primary'
                                onClick={()=>this.handleSaveTime()}
                            >
                                <FormattedMessage id = "schedule-manage.save-btn"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='container mt-4 background list-schedule'>
                    <ListSchedule
                        doctorID={this.state.selectedDoctor.value}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
