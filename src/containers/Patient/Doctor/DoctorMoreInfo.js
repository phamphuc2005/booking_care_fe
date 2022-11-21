import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DoctorMoreInfo.scss';
import {getDetailDoctor} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import  moment from 'moment';
import localization from 'moment/locale/vi';
import {getDoctorScheduleByDate} from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorMoreInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    async componentDidMount() {

    }

    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.language !== prevProps.language) {
        //     let allDates = this.getArrDates(this.props.language);
        //     this.setState({
        //         allDates: allDates
        //     })
        // }
        // if(this.props.doctorID !== prevProps.doctorID) {
        //     let allDates = this.getArrDates(this.props.language);
        //     let res = await getDoctorScheduleByDate(this.props.doctorID, allDates[0].value);
        //     this.setState({
        //         allTimes: res.data ? res.data : []
        //     })
        // }
    }

    showMoreInfo = (status) => {
        this.setState({
            isShow: status
        })
    }


    render() {
        let {isShow} = this.state;
        return (
            <div className='doctor-more-info-container'>
                <div className='content-up'>
                    <div className='up-title'><FormattedMessage id = "patient.doctor-more-info.address"/></div>
                    <div className='name-clinic'>Phòng khám Chuyên khoa Da Liễu</div>
                    <div className='address-clinic'>207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <div className='content-down'>
                    {isShow === false && 
                        <div>
                            <div className='down-title'><FormattedMessage id = "patient.doctor-more-info.price"/>: 300.000 VND</div>
                            <span className='show-hide' onClick={()=>this.showMoreInfo(true)}><FormattedMessage id = "patient.doctor-more-info.show"/></span>
                        </div>
                    }
                    {isShow === true &&
                        <div>
                            <div className='down-title'><FormattedMessage id = "patient.doctor-more-info.price"/></div>
                            <div className='price'>
                                <div className='price-title'>
                                    <span className='left'><FormattedMessage id = "patient.doctor-more-info.price"/>:</span>
                                    <span className='right'> 3000.000VND</span>
                                </div>
                                <div className='note'>Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD</div>
                            </div>
                            <div className='payment'>Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
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
