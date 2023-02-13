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
            errCode: 0,
            errMessage: ''
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
                    errCode: res && res.errCode ? res.errCode : -1,
                    errMessage: res && res.errMessage ? res.errMessage : ''
                })
            }
        }
    }

    
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let {statusVerify, errCode, errMessage} = this.state;
        return (
            <>
                <HomeHeader/>
                <div className='notification'>
                    {statusVerify === false ?
                        <div>Loading data ...</div> :
                        <div>
                            {errCode === 0 ?
                                <div className='success'><FormattedMessage id = "patient.verify.success"/></div> :
                                <div>
                                    {errCode === 2 ?
                                        <div className='failed'><FormattedMessage id = "patient.verify.failed"/></div>:
                                        <div className='warn'>{errMessage}</div> 
                                    }
                                </div>
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
