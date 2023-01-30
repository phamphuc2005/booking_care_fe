import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DoctorSchedule.scss';
import {getDetailDoctor, getUserInfo} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import  moment from 'moment';
import localization from 'moment/locale/vi';
import {getDoctorScheduleByDate} from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
import { toast } from 'react-toastify';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDates: [],
            allTimes: [],
            isOpenModalBooking: false,
            dataModal: {},
            roleId: ''
        }
    }

    async componentDidMount() {
        let {language} = this.props;
        let allDates = this.getArrDates(language);

        if(this.props.doctorID) {
            let res = await getDoctorScheduleByDate(this.props.doctorID, allDates[0].value);
            this.setState({
                allTimes: res.data ? res.data : []
            })
        }

        this.setState({
            allDates: allDates,
        })

        await this.getUser();

    }

    getUser = async () => {
        let response = await getUserInfo({id: this.props.userInfo.id});
        if(response && response.errCode === 0) {
            this.setState({
                roleId: response.data.roleId
            })
        }
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
            console.log('huhu',res)
        }
    }

    handleClickTime = (time) => {
        if(this.props.isLoggedIn === true) {
            if(this.state.roleId === 'R2') {
                this.setState({
                    isOpenModalBooking: true,
                    dataModal: time
                })
                console.log('time',time)
            } else {
            toast.warn('You are not allowed to schedule medical appointments !')
            }
        } else {
            toast.warn('You need to log in to the system to be able to make an appointment !')
        }
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }



    render() {
        let {allDates, allTimes, isOpenModalBooking, dataModal} = this.state;
        let {language} = this.props;
        // console.log(this.props.setLoadingData);
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
                    setLoadingData = {this.props.setLoadingData}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
