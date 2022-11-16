import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DoctorSchedule.scss';
import {getDetailDoctor} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import  moment from 'moment';
import localization from 'moment/locale/vi';
import {getDoctorScheduleByDate} from '../../../services/userService'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDates: {}
        }
    }

    async componentDidMount() {
        let {language} = this.props;
        if(language === LANGUAGES.VI) {}
        console.log(moment(new Date()).format('dddd - DD/MM'));
        console.log(moment(new Date()).locale('en').format('ddd - DD/MM'));

        this.setArrDates(language)
    }

    setArrDates =  (language) => {
        let allDates = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if(language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDates.push(object);
        }

        

        this.setState({
            allDates: allDates
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language) {
            this.setArrDates(this.props.language)
        }
    }

    handleOnChangeSelect = async (event) => {
        if(this.props.doctorID && this.props.doctorID !== -1){
            let doctorId = this.props.doctorID;
            let date = event.target.value
            let res = await getDoctorScheduleByDate(doctorId, date)
            console.log('huhu',res)
        }
    }

    render() {
        let {allDates} = this.state;
        return (
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
                <div className='all-hour'></div>
            </div>
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
