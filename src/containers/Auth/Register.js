import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Register.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginApi, handleRegister, handleConfirmRegister} from '../../services/userService'
import e from 'cors';
import { toast } from 'react-toastify';
import ConfirmRegisterModal from './ConfirmRegisterModal';
import { LANGUAGES } from '../../utils';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeat_pass: '',
            isShowPassword: false,
            isShowRe_pass: false,
            errMessage: '',
            username: '',
            random_number: '',
            isOpenModal: false,
            dataModal: {},
        }
    }
    handleOnChangeFirstname = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }
    handleOnChangeLastname = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleOnChangeRepeat = (event) => {
        this.setState({
            repeat_pass: event.target.value
        })
    }

    handleFromModal = async (dataFromModal) => {
        this.setState({
            random_number: dataFromModal
        })
        setTimeout(async function(){
            let check = await handleConfirmRegister(this.state);
            if(check && check.errCode !==0) {
                this.setState({
                    errMessage: check.message
                })
                toast.error(check.errMessage)
            } 
            if(check && check.errCode ===0) {
                toast.success('You have successfully registered your account !')
                this.setState({
                    isOpenModal: false
                })

                let login = await handleLoginApi(this.state.username, this.state.password);
                if(login && login.errCode !==0) {
                    this.setState({
                        errMessage: login.message
                    })
                }
                if(login && login.errCode ===0) {
                    this.props.userLoginSuccess(login.user)
                    console.log('login success!')
                    if(this.props.history) {
                        setTimeout(function(){this.props.history.push(`/home`)}.bind(this), 3500);
                    }
                }
            }
        }.bind(this), 5000);
        
    }

    toggleModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
        
    }
    
    handleRegister = async () => {
        // console.log('username:' + this.state.username)
        // console.log('password:' + this.state.password)
        this.setState({
            errMessage: ''
        })
        if(this.state.repeat_pass === this.state.password) {
            try {
                let data = await handleRegister(this.state);
                if(data && data.errCode !==0) {
                    this.setState({
                        errMessage: data.message
                    })
                    toast.error(data.errMessage)
                }
                if(data && data.errCode ===0) {
                    this.setState({
                        isOpenModal: true,
                    })
                }
    
            } catch (error) {
                if(error.response) {
                    if(error.response.data) {
                        this.setState({
                            errMessage: error.response.data.message
                        })
                        toast.error(error.response.data.message)
                    }
                }
                console.log(error);
                
            }
        } else {
            toast.error('Repeat password is not correct!')
        }
        
    }
    handleShowHidePass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleShowRe_pass = () => {
        this.setState({
            isShowRe_pass: !this.state.isShowRe_pass
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleRegister();
        }
    }

    returnLogin = () => {
        if(this.props.history) {
            this.props.history.push(`/login`)
        }
    }
    
    render() {
        let {isOpenModal, dataModal} = this.state;
        let {language} = this.props;
        let first = language === LANGUAGES.VI ? 'Nhập họ ...' : 'Enter your firstname ...';
        let last = language === LANGUAGES.VI ? 'Nhập tên ...' : 'Enter your lastname ...';
        let email = language === LANGUAGES.VI ? 'Nhập email ...' : 'Enter your email ...';
        let pass = language === LANGUAGES.VI ? 'Nhập mật khẩu ...' : 'Enter your password ...';
        let repass = language === LANGUAGES.VI ? 'Nhập lại mật khẩu ...' : 'Enter your repeat password ...';

        return (
            <>
                <div className="register-background">
                    <div className='text-title'>-- BOOKING HEALTH --</div>
                    <div className="register-container">
                        <div className="register-content row">
                            <div className="col-12 text-register"><FormattedMessage id = "register.title"/></div>
                            <div className="col-6 form-group register-input">
                                <label><FormattedMessage id = "register.firstname"/>:</label>
                                <input 
                                    type="text" 
                                    className='form-control' 
                                    placeholder={first}
                                    value={this.state.firstName}
                                    onChange = {(event) => this.handleOnChangeFirstname(event)}
                                />
                            </div>
                            <div className="col-6 form-group register-input">
                                <label><FormattedMessage id = "register.lastname"/>:</label>
                                <input 
                                    type="text" 
                                    className='form-control' 
                                    placeholder={last}
                                    value={this.state.lastName}
                                    onChange = {(event) => this.handleOnChangeLastname(event)}
                                />
                            </div>
                            <div className="col-12 form-group register-input">
                                <label>Email:</label>
                                <input 
                                    type="text" 
                                    className='form-control' 
                                    placeholder={email}
                                    value={this.state.email}
                                    onChange = {(event) => this.handleOnChangeEmail(event)}
                                />
                            </div>
                            <div className="col-12 form-group register-input">
                                <label><FormattedMessage id = "register.password"/>:</label>
                                <div className='custom-input-pass' >
                                    <input 
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className='form-control' 
                                        placeholder={pass}
                                        value={this.state.password}
                                        onChange = {(event) => this.handleOnChangePassword(event)}
                                    />
                                    <span onClick={() => {this.handleShowHidePass()}}>
                                        <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 form-group register-input">
                                <label><FormattedMessage id = "register.repeat"/>:</label>
                                <div className='custom-input-pass' >
                                    <input 
                                        type={this.state.isShowRe_pass ? 'text' : 'password'}
                                        className='form-control' 
                                        placeholder={repass}
                                        value={this.state.repeat_pass}
                                        onChange = {(event) => this.handleOnChangeRepeat(event)}
                                        onKeyDown = {(event) => this.handleKeyDown(event)}
                                    />
                                    <span onClick={() => {this.handleShowRe_pass()}}>
                                        <i className={this.state.isShowRe_pass ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                    </span>
                                </div>
                            </div>
                            <div className='col-12' style={{color: 'red'}}>
                                {this.state.errMessage}
                            </div>
                            <div className='col-12'>
                                <button className='register-btn' onClick={()=>{this.handleRegister()}}><FormattedMessage id = "register.title"/></button>
                            </div>
                            <div className='col-12 if-login'>
                                <span className='login-title'><FormattedMessage id = "register.login-link"/></span>
                                <span className='login-link' onClick={()=>this.returnLogin()}><FormattedMessage id = "register.login"/></span>
                            </div>
                            {/* <div className='col-12 text-center mt-4'>
                                <span className='text-other-login'><FormattedMessage id = "login.otherlogin"/>:</span>
                            </div>
                            <div className='col-12 social-login'>
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div> */}

                        </div>
                    </div>
                </div>
                <ConfirmRegisterModal
                    isOpenModal={isOpenModal}
                    dataModal={dataModal}
                    toggleFromParent = {this.toggleModal}
                    sendConfirm={this.handleFromModal}
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
