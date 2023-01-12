import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService'
import e from 'cors';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        console.log('username:' + this.state.username)
        console.log('password:' + this.state.password)
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !==0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode ===0) {
                this.props.userLoginSuccess(data.user)
                console.log('login success!')
            }

        } catch (error) {
            if(error.response) {
                if(error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(error);
            
        }
    }
    handleShowHidePass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }

    returnRegister = () => {
        if(this.props.history) {
            this.props.history.push(`/register`)
        }
    }
    
    render() {
        return (
            <div className="login-background">
                <div className='text-title'>BOOKING CARE</div>
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login"><FormattedMessage id = "login.title"/></div>
                        <div className="col-12 form-group login-input">
                            <label><FormattedMessage id = "login.username"/>:</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange = {(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label><FormattedMessage id = "login.password"/>:</label>
                            <div className='custom-input-pass' >
                                <input 
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control' 
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange = {(event) => this.handleOnChangePassword(event)}
                                    onKeyDown = {(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => {this.handleShowHidePass()}}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='login-btn' onClick={()=>{this.handleLogin()}}><FormattedMessage id = "login.btn"/></button>
                        </div>
                        <div className='col-12 forgot-pass'>
                            <span><FormattedMessage id = "login.forgot"/>?</span>
                        </div>
                        <div className='col-12 if-register'>
                            <span className='register-title'><FormattedMessage id = "login.register-link"/></span>
                            <span className='register-link' onClick={()=>this.returnRegister()}><FormattedMessage id = "login.register"/></span>
                        </div>
                        <div className='col-12 text-center mt-4'>
                            <span className='text-other-login'><FormattedMessage id = "login.otherlogin"/>:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>

                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
