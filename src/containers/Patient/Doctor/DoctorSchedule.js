import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DoctorSchedule.scss';
import {getDetailDoctor} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import  moment from 'moment';
import localization from 'moment/locale/vi';
import {getDoctorScheduleByDate} from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDates: [],
            allTimes: [],
            isOpenModalBooking: false,
            dataModal: {}
        }
    }

    async componentDidMount() {
        let {language} = this.props;
        let allDates = this.getArrDates(language);

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
                    let labelViToday = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${labelViToday}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if(i === 0) {
                    let labelEnToday = moment(new Date()).format('DD/MM');
                    let today = `Today - ${labelEnToday}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

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
            console.log('huhu',res)
        }
    }

    handleClickTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataModal: time
        })
        console.log(time)
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let {allDates, allTimes, isOpenModalBooking, dataModal} = this.state;
        let {language} = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
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
                        <div className='text-calendar'>
                            <span>
                                <i className="far fa-calendar-alt"></i>
                                    <FormattedMessage id = "patient.doctor-detail.text-calendar"/>
                            </span>
                        </div>
                        <div className='time-container'>
                            {allTimes && allTimes.length>0 ?
                                <>
                                    {allTimes.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                        return(
                                            <button 
                                                key={index}
                                                onClick={()=>this.handleClickTime(item)}
                                            >
                                                {timeDisplay}
                                            </button>
                                        )
                                    })}
                                    <div className='text-note'><FormattedMessage id = "patient.doctor-detail.choose"/><i className="far fa-hand-point-up"></i><FormattedMessage id = "patient.doctor-detail.free"/></div>
                                </> :
                                <div className='text-notice'><FormattedMessage id = "patient.doctor-detail.text-notice"/></div>     
                            }
                        </div>
                    </div>
                </div>

                <BookingModal 
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
