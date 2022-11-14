import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../../containers/Header/Header';
import { FormattedMessage } from 'react-intl';
import './ScheduleManage.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

class ScheduleManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            time: []
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
            this.setState({
                time: this.props.allTime
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

    render() {
        console.log(this.state)
        let {time} = this.state;
        let {language} = this.props;
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
                            />
                        </div>
                        <div className='col-2 form-group'>
                            <label><FormattedMessage id = "schedule-manage.choose-day"/>:</label>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleChangeDate}
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 form-group hour-container'>
                            {time && time.length>0 &&
                                time.map((item, index) => {
                                    return (
                                        <button className='btn btn-hour' key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary'>
                                <FormattedMessage id = "schedule-manage.save-btn"/>
                            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
