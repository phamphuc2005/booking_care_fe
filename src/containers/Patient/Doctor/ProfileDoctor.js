import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import {getProfileDoctor} from '../../../services/userService';
import NumberFormat from 'react-number-format';


class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: {}
        }
    }

    async componentDidMount() {
        let data = await this.getDoctorInfo(this.props.doctorId);
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
        // if(this.props.language !== prevProps.language) {
        //     let allDates = this.getArrDates(this.props.language);
        //     this.setState({
        //         allDates: allDates
        //     })
        // }
        if(this.props.doctorId !== prevProps.doctorId) {
            // this.getDoctorInfo(this.props.doctorId);
        }
    }

    render() {
        let {profileData} = this.state;
        let {language} = this.props;
        let nameVi = '', nameEn = '';
        if(profileData && profileData.positionData){
            nameVi = `${profileData.positionData.valueVi}, ${profileData.firstName} ${profileData.lastName}`;
            nameEn = `${profileData.positionData.valueEn}, ${profileData.lastName} ${profileData.firstName}`;
        }
        console.log('profile', this.state)
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
                            {profileData && profileData.Markdown && profileData.Markdown.description &&
                                <span>
                                    {profileData.Markdown.description}
                                </span>
                            }
                        </div>
                    </div>
                </div>
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
