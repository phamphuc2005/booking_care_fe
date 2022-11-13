import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';

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

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo' onClick={()=>this.returnHome()}></div>
                        </div>
                        <div className='center-content'>
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
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support"/>
                            </div>
                            <div><i className="fas fa-globe languages"></i></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            <span className='login-btn' onClick={()=>this.returnLogin()}>
                                <i className="fas fa-sign-in-alt"></i>
                                <FormattedMessage id = "homeheader.login"/>
                            </span>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
