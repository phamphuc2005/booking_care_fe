import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import {getProfileDoctor} from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: {}
        }
    }

    async componentDidMount() {
        let data = await this.getDoctorInfo(this.props.doctorId);
        if(this.props.doctorId) {
            let res = await getProfileDoctor(this.props.doctorId);
            this.setState({
                profileData: res.data ? res.data : []
            })
        }
        this.setState({
            profileData: data
        })
    }

    getDoctorInfo = async (id) => {
        let result = {};
        if(id) {
            let res = await getProfileDoctor(id)
            if(res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }
    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.doctorId !== prevProps.doctorId) {
            let res = await getProfileDoctor(this.props.doctorId);
            this.setState({
                profileData: res.data ? res.data : []
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderBookingTime = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? 
                this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd , DD/MM/YYYY')) : 
                moment.unix(+dataTime.date / 1000).locale('en').format('dddd , MM/DD/YYYY')
            return (
                <>
                    <div><FormattedMessage id = "patient.booking-modal.time"/>: {time} , {date}</div>
                    <div><FormattedMessage id = "patient.booking-modal.free"/></div>
                </>
            )
        }
        return <></>
    }

    render() {
        let {profileData} = this.state;
        let {language, isShowDescription, dataTime, isShowLink, isShowPrice, doctorId} = this.props;
        let nameVi = '', nameEn = '';
        let description = ''
        if(profileData && profileData.positionData){
            nameVi = `${profileData.positionData.valueVi}, ${profileData.firstName} ${profileData.lastName}`;
            nameEn = `${profileData.positionData.valueEn}, ${profileData.lastName} ${profileData.firstName}`;
        }
        if(language === LANGUAGES.VI) {
            if(profileData && profileData.Markdown && profileData.Markdown.description){
                description = profileData.Markdown.description;
            }
        } else {
            if(profileData && profileData.Markdown_En && profileData.Markdown_En.description){
                description = profileData.Markdown_En.description;
            }
        }
        return (
            <div className='profile-doctor'>
                <div className='content-up'>
                    <div 
                        className='content-left'
                        style={{backgroundImage: `url(${profileData && profileData.image ? profileData.image : ''})`}}
                    ></div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi :nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescription === true ?
                                <>
                                    
                                        <span>
                                            {description}
                                        </span>
                                    
                                </> : this.renderBookingTime(dataTime)
                            }
                        </div>
                    </div>
                </div>
                {isShowLink === true && <div className='more'>
                    <Link to={`/detail-doctor/${doctorId}`}><FormattedMessage id = "patient.booking-modal.more"/></Link>
                </div>}
                {isShowPrice === true &&
                    <div className='content-down'>
                        <FormattedMessage id = "patient.booking-modal.price"/>: {
                            profileData && profileData.Doctor_Info && language === LANGUAGES.VI ?
                            <NumberFormat
                                className='price'
                                value={profileData.Doctor_Info.priceData.valueVi} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={' VND'}
                            /> : ''
                        }
                        {
                            profileData && profileData.Doctor_Info && language === LANGUAGES.EN ?
                            <NumberFormat
                                className='price'
                                value={profileData.Doctor_Info.priceData.valueEn} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={' $'}
                            /> : ''
                        }
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
