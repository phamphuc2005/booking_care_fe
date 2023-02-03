import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DoctorMoreInfo.scss';
import {LANGUAGES} from '../../../utils';
import  moment from 'moment';
import localization from 'moment/locale/vi';
import {getMoreDoctorInfo} from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorMoreInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            moreInfo: {}
        }
    }

    async componentDidMount() {
        if(this.props.doctorID) {
            let res = await getMoreDoctorInfo(this.props.doctorID);
            if(res && res.errCode === 0) {
                this.setState({
                    moreInfo: res.data
                })
            }
        }
    }

    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.language !== prevProps.language) {
        //     let allDates = this.getArrDates(this.props.language);
        //     this.setState({
        //         allDates: allDates
        //     })
        // }
        if(this.props.doctorID !== prevProps.doctorID) {
            let res = await getMoreDoctorInfo(this.props.doctorID);
            if(res && res.errCode === 0) {
                this.setState({
                    moreInfo: res.data
                })
            }
        }
    }

    showMoreInfo = (status) => {
        this.setState({
            isShow: status
        })
    }


    render() {
        let {isShow, moreInfo} = this.state;
        let {language} = this.props;
        console.log('more', this.state.moreInfo.Clinic);
        return (
            <div className='doctor-more-info-container'>
                <div className='content-up'>
                    <div className='up-title'><FormattedMessage id = "patient.doctor-more-info.address"/></div>
                    <div className='name-clinic'>
                        {language === LANGUAGES.VI ? 
                        (moreInfo && moreInfo.Clinic && moreInfo.Clinic.name ? moreInfo.Clinic.name : '') :
                        (moreInfo && moreInfo.Clinic_En && moreInfo.Clinic_En.name_en ? moreInfo.Clinic_En.name_en : '')}
                    </div>
                    <div className='address-clinic'>{moreInfo && moreInfo.addressClinic ? moreInfo.addressClinic : ''}</div>
                </div>
                <div className='content-down'>
                    
                    {isShow === false && 
                        <div>
                            <div className='down-title'><FormattedMessage id = "patient.doctor-more-info.price"/>: {
                                    moreInfo && moreInfo.priceData && language === LANGUAGES.VI &&
                                    <NumberFormat
                                        className='fee' 
                                        value={moreInfo.priceData.valueVi} 
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        suffix={' VND'}/>
                                }
                                {
                                    moreInfo && moreInfo.priceData && language === LANGUAGES.EN &&
                                    <NumberFormat
                                        className='fee' 
                                        value={moreInfo.priceData.valueEn} 
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        suffix={' $'}/>
                                }
                            </div>
                            <span className='show-hide' onClick={()=>this.showMoreInfo(true)}><FormattedMessage id = "patient.doctor-more-info.show"/></span>
                        </div>
                    }
                    {isShow === true &&
                        <div>
                            <div className='down-title'><FormattedMessage id = "patient.doctor-more-info.price"/></div>
                            <div className='price'>
                                <div className='price-title'>
                                    <span className='left'><FormattedMessage id = "patient.doctor-more-info.price"/>:</span>
                                    <span className='right'> 
                                        {
                                            moreInfo && moreInfo.priceData && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                value={moreInfo.priceData.valueVi} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                suffix={' VND'}/>
                                        }
                                        {
                                            moreInfo && moreInfo.priceData && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                value={moreInfo.priceData.valueEn} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                suffix={' $'}/>
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    <FormattedMessage id = "patient.doctor-more-info.note"/>
                                    {moreInfo && moreInfo.note ? moreInfo.note : ''}
                                </div>
                            </div>
                            <div className='payment'><FormattedMessage id = "patient.doctor-more-info.payment"/>
                                {
                                    moreInfo && moreInfo.paymentData && language === LANGUAGES.VI ? moreInfo.paymentData.valueVi : ''
                                }
                                {
                                    moreInfo && moreInfo.paymentData && language === LANGUAGES.EN ? moreInfo.paymentData.valueEn : ''
                                }
                            </div>
                            <span className='show-hide' onClick={()=>this.showMoreInfo(false)}><FormattedMessage id = "patient.doctor-more-info.hide"/></span>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorMoreInfo);
