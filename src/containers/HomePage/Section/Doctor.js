import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';

class Doctor extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor();
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let {language} = this.props;
        arrDoctors = arrDoctors.concat(arrDoctors)
        return (
            <div className='section-share section-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id = "section.doctor"/></span>
                        <button className='btn-section'><FormattedMessage id = "section.search-btn"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length>0 
                            && arrDoctors.map((item, index) => {
                                let imgBase64 = '';
                                if(item.image){
                                    imgBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                                return (
                                    <div className='section-customize section-doctor' key={index}>
                                        <div className='customize-border'>
                                            <div className='outer-bg'>
                                                <div 
                                                    className='background-img img-doctor'
                                                    style={{backgroundImage: `url(${imgBase64})`}}
                                                ></div>
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi :nameEn}</div>
                                                <div>Da liễu {index}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
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
        topDoctorRedux: state.admin.topDoctor

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
