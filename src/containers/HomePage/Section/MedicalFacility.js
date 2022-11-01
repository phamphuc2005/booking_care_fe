import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class MedicalFacility extends Component {

    render() {
        return (
            <div className='section-share section-medicalfacility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-medicalfacility'></div>
                                </div>
                                <div className='position text-center'>Hệ thống y tế Thu Cúc 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-medicalfacility'></div>
                                </div>
                                <div className='position text-center'>Hệ thống y tế Thu Cúc 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-medicalfacility'></div>
                                </div>
                                <div className='position text-center'>Hệ thống y tế Thu Cúc 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-medicalfacility'></div>
                                </div>
                                <div className='position text-center'>Hệ thống y tế Thu Cúc 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-medicalfacility'></div>
                                </div>
                                <div className='position text-center'>Hệ thống y tế Thu Cúc 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-medicalfacility'></div>
                                </div>
                                <div className='position text-center'>Hệ thống y tế Thu Cúc 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
