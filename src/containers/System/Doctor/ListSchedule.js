import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './ListSchedule.scss';
import {LANGUAGES} from '../../../utils';
import  moment from 'moment';
import localization from 'moment/locale/vi';
import {getDoctorScheduleByDate, deleteSchedule} from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { Dropdown } from 'react-bootstrap';

class ListSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDates: [],
            allTimes: [],
            isOpenModalBooking: false,
            dataModal: {},
        }
    }

    async componentDidMount() {
        let {language} = this.props;
        let allDates = this.getArrDates(language);

        if(this.props.doctorID) {
            let res = await getDoctorScheduleByDate(this.props.doctorID, allDates[0].value);
            this.setState({
                allTimes: res.data ? res.data : [],
            })
        }

        this.setState({
            allDates: allDates,
        })

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDates =  (language) => {
        let allDates = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if(language === LANGUAGES.VI) {
                if(i === 0) {
                    let labelViTomorrow = moment(new Date(new Date().setDate(new Date().getDate()+1))).format('DD/MM');
                    let tomorrow = `Ngày mai - ${labelViTomorrow}`;
                    object.label = tomorrow;
                } else {
                    let labelVi = moment(new Date()).add(i+1, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if(i === 0) {
                    let labelEnTomorrow = moment(new Date()).format('DD/MM');
                    let tomorrow = `Tomorrow - ${labelEnTomorrow}`;
                    object.label = tomorrow;
                } else {
                    object.label = moment(new Date()).add(i+1, 'days').locale('en').format('dddd - DD/MM');
                }
            }

            object.value = moment(new Date()).add(i+1, 'days').startOf('day').valueOf();

            allDates.push(object);
        }
        return allDates;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language) {
            let allDates = this.getArrDates(this.props.language);
            this.setState({
                allDates: allDates
            })
        }
        if(this.props.doctorID !== prevProps.doctorID) {
            let allDates = this.getArrDates(this.props.language);
            let res = await getDoctorScheduleByDate(this.props.doctorID, allDates[0].value);
            this.setState({
                allTimes: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (event) => {
        if(this.props.doctorID && this.props.doctorID !== -1){
            let doctorId = this.props.doctorID;
            let date = event.target.value
            let res = await getDoctorScheduleByDate(doctorId, date);
            if(res && res.errCode === 0) {
                this.setState({
                    allTimes: res.data ? res.data : []
                })
            } else {

            }
        }
    }

    handleClickTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataModal: time
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    handleDeleteTime = async (item) => {
        if(item.currentNumber !== 0) {
            toast.warn('Đã có bệnh nhân đặt lịch. Không xóa được lịch khám !')
        } else {
            try {
                let res = await deleteSchedule(item.id);
                if(res && res.errCode === 0) {
                    toast.success("Delete schedule for success!");
                    this.componentDidMount();
                } else {
                    toast.warn(res.errMessage)
                }
            } catch (error) {
                toast.error("Delete schedule for failed!");
                console.log('Error:', error)
            }
        }
    }

    render() {
        let {allDates, allTimes, isOpenModalBooking, dataModal} = this.state;
        let {language} = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='text-calendar'>
                        <span>
                            <i className="far fa-calendar-alt"></i>
                                <FormattedMessage id = "schedule-manage.list-schedule"/>
                        </span>
                    </div>
                    <div className='all-date'>
                        <select onChange={(event)=>this.handleOnChangeSelect(event)}>
                            {allDates && allDates.length > 0 &&
                                allDates.map((item, index) => {
                                    return (
                                        <option 
                                            value={item.value} 
                                            key={index}
                                        >{item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-hour'>
                        <div className='time-container table-list'>
                            <table id="table-schedule" className='col-12'>
                                <tbody>
                                    <tr>
                                        <th style={{width: '25%'}}><FormattedMessage id = "schedule-manage.time"/></th>
                                        <th style={{width: '25%'}}><FormattedMessage id = "schedule-manage.current"/></th>
                                        <th style={{width: '25%'}}><FormattedMessage id = "schedule-manage.max"/></th>
                                        <th style={{width: '25%'}}><FormattedMessage id = "schedule-manage.delete-schedule"/></th>
                                    </tr>
                                    {allTimes && allTimes.length>0 ?
                                        <>
                                            {allTimes.map((item, index) => {
                                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                                return(
                                                    <tr
                                                    className='schedule-row'
                                                    key={index} style={{textAlign: 'center'}}
                                                    >
                                                        <td>{timeDisplay}</td>
                                                        <td>{item.currentNumber}</td>
                                                        <td>{item.maxNumber}</td>
                                                        <td><i className='fas fa-trash-alt' onClick={()=>this.handleDeleteTime(item)}></i></td>
                                                    </tr>
                                                )
                                            })}
                                        </> :
                                        <tr className='no-data'>
                                            <td colSpan={4}><FormattedMessage id = "schedule-manage.text-notice"/></td>
                                        </tr>    
                                    }

                                </tbody>
                            </table>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSchedule);
