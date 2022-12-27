import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import * as actions from "../../store/actions";
import { withRouter } from 'react-router';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    
    returnHome = () => {
        if(this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    returnLogin = () => {
        if(this.props.history) {
            this.props.history.push(`/login`)
        }
    }

    returnUserManage = () => {
        if(this.props.history) {
            this.props.history.push(`/system/user-manage`)
        }
    }

    handleListDoctor = () => {
        if(this.props.history) {
            this.props.history.push(`/list-doctor`)
        }
    }

    handleListClinic = () => {
        if(this.props.history) {
            this.props.history.push(`/list-clinic`)
        }
    }

    handleListSpecialty = () => {
        if(this.props.history) {
            this.props.history.push(`/list-specialty`)
        }
    }

    render() {
        let language = this.props.language;
        let isLoggedIn = this.props.isLoggedIn;
        let userInfo = this.props.userInfo;
        let processLogout = this.props.processLogout;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <Dropdown className='dropdown'>
                                <Dropdown.Toggle className='icon'  id="dropdown-basic" >
                                    <i className="fas fa-bars"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='menu'>
                                    <Dropdown.Item className='item' href="" onClick={()=>this.returnHome()}>
                                        <i className='fas fa-home'></i>
                                        <FormattedMessage id="homeheader.home"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item className='item' href="" onClick={()=>this.handleListDoctor()}>
                                        <i className='fas fa-user-md'></i>
                                        <FormattedMessage id="homeheader.list-doctor"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item className='item' href="" onClick={()=>this.handleListClinic()}>
                                        <i className='fas fa-hospital-alt'></i>
                                        <FormattedMessage id="homeheader.list-clinic"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item className='item' href="" onClick={()=>this.handleListSpecialty()}>
                                        <i className="fas fa-first-aid"></i>
                                        <FormattedMessage id="homeheader.list-specialty"/>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className='header-logo' onClick={()=>this.returnHome()}></div>
                        </div>
                        {/* <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.healthfacility"/></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.choosehospital"/></div>
                                </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.choosedoctor"/></div>
                                </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.checkpackage"/></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.generalexamination"/></div>
                                </div>
                        </div> */}
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support"/>
                            </div>
                            <div><i className="fas fa-globe languages"></i></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            {isLoggedIn ? 
                                <>
                                <span className='welcome'>
                                        <Dropdown className='image'>
                                            <Dropdown.Toggle className='avatar'  id="dropdown-basic" ></Dropdown.Toggle>
                                            <Dropdown.Menu className='menu'>
                                                <Dropdown.Item className='item' href="" disabled>
                                                    <i className='fas fa-user'></i>
                                                    {userInfo && userInfo.firstName ? userInfo.firstName : ''} {userInfo && userInfo.lastName ? userInfo.lastName : ''}
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item className='item' href="" onClick={()=>this.returnUserManage()}>
                                                    <i className='fas fa-cog'></i>
                                                    <FormattedMessage id="homeheader.manage"/>
                                                </Dropdown.Item>
                                                <Dropdown.Item className='item' href="" onClick={processLogout}>
                                                    <i className="fas fa-sign-out-alt"></i>
                                                    <FormattedMessage id="homeheader.logout"/>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                </span>
                                </> :
                                <>
                                    <span className='login-btn' onClick={()=>this.returnLogin()}>
                                        <i className="fas fa-sign-in-alt"></i>
                                        <FormattedMessage id = "homeheader.login"/>
                                    </span>
                                    <span className='register-btn' >
                                        <i className="fas fa-angle-double-right"></i>
                                        <FormattedMessage id = "homeheader.register"/>
                                    </span>
                                </>
                            }
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='banner-up'>
                            <div className='title1'><FormattedMessage id="banner.title1"/></div>
                            <div className='title2'><FormattedMessage id="banner.title2"/></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm bác sĩ'/>
                            </div>
                        </div>
                        <div className='banner-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="far fa-hospital"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.speciality"/></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="fas fa-briefcase-medical"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.generality"/></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.remote"/></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="fas fa-stethoscope"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.medicaltest"/></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="fas fa-heartbeat"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.mentalhealth"/></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="fas fa-syringe"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.dental"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
