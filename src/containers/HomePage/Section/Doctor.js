import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class Doctor extends Component {

    render() {
        return (
            <div className='section-share section-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id = "section.doctor"/></span>
                        <button className='btn-section'><FormattedMessage id = "section.search-btn"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize section-doctor'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='background-img img-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn A</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize section-doctor'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='background-img img-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn B</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize section-doctor'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='background-img img-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn C</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize section-doctor'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='background-img img-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn D</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize section-doctor'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='background-img img-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn E</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize section-doctor'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='background-img img-doctor'></div>
                                    </div>  
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn F</div>
                                        <div>Da liễu</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
