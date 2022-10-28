import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';

class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
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
                            <div className='language-vi'>VN</div>
                            <div className='language-en'>EN</div>
                        </div>
                    </div>
                </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
