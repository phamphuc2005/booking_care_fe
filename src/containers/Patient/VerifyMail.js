import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import {LANGUAGES} from '../../utils';
import { FormattedMessage } from 'react-intl';
import { postVerifyBooking } from '../../services/userService';
import './VerifyMail.scss'

class VerifyMail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if(this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBooking({
                token: token,
                doctorId: doctorId
            })
            if(res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
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
    }

    render() {
        let {statusVerify, errCode} = this.state;
        return (
            <>
                <HomeHeader/>
                <div className='notification'>
                    {statusVerify === false ?
                        <div>Loading data ...</div> :
                        <div>
                            {errCode === 0 ?
                                <div className='success'><FormattedMessage id = "patient.verify.success"/></div> :
                                <div className='failed'><FormattedMessage id = "patient.verify.failed"/></div>
                            }
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyMail);
