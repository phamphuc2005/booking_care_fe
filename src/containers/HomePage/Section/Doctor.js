import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';
import { withRouter } from 'react-router';

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

    handleViewDetailDoctor = (doctor) => {
        console.log(doctor);
        if(this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    handleListDoctor = () => {
        if(this.props.history) {
            this.props.history.push(`/list-doctor`)
        }
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let {language} = this.props;
        // arrDoctors = arrDoctors.concat(arrDoctors)
        return (
            <div className='section-share section-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id = "section.doctor"/></span>
                        <button className='btn-section' onClick={()=>this.handleListDoctor()}><FormattedMessage id = "section.more-btn"/></button>
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
                                    <div className='section-customize section-doctor' key={index} onClick={()=> this.handleViewDetailDoctor(item)}>
                                        <div className='customize-border'>
                                            <div className='outer-bg'>
                                                <div 
                                                    className='background-img img-doctor'
                                                    style={{backgroundImage: `url(${imgBase64})`}}
                                                ></div>
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi :nameEn}</div>
                                                {language === LANGUAGES.VI ?
                                                    <div>
                                                        {item.Doctor_Info  && item.Doctor_Info.Specialty && item.Doctor_Info.Specialty.name ?
                                                        item.Doctor_Info.Specialty.name : '...'
                                                        }
                                                    </div> :
                                                    <div>
                                                        {item.Doctor_Info  && item.Doctor_Info.Specialty_En && item.Doctor_Info.Specialty_En.name ?
                                                        item.Doctor_Info.Specialty_En.name : '...'
                                                        }
                                                </div>
                                                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
