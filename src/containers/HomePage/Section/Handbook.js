import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class Handbook extends Component {

    render() {
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id = "section.handbook"/></span>
                        <button className='btn-section'><FormattedMessage id = "section.more-btn"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-handbook'></div>
                                </div>
                                <div className='position text-center'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-handbook'></div>
                                </div>
                                <div className='position text-center'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-handbook'></div>
                                </div>
                                <div className='position text-center'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-handbook'></div>
                                </div>
                                <div className='position text-center'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-handbook'></div>
                                </div>
                                <div className='position text-center'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='background-img img-handbook'></div>
                                </div>
                                <div className='position text-center'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
