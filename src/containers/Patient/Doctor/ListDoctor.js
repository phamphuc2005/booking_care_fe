import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ListDoctor.scss';
import _ from 'lodash';

class ListDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }

    async componentDidMount() {
        this.props.loadTopDoctor();
    }

    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.language !== prevProps.language) {
        //     let allDates = this.getArrDates(this.props.language);
        //     this.setState({
        //         allDates: allDates
        //     })
        // }
        if(prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        console.log(doctor);
        if(this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    handleBack = () => {
        if(this.props.history) {
            this.props.history.goBack()
        }
    }

    handleNext = () => {
        if(this.props.history) {
            this.props.history.goForward()
        }
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let {language} = this.props;
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className='list-doctors'>
                    <div className='list-header'>
                        <div className='back-btn' onClick={()=>this.handleBack()}>
                            <i className='fas fa-arrow-left'></i>
                        </div>
                        <FormattedMessage id="section.list-doctor"/>
                        <div className='next-btn' onClick={()=>this.handleNext()}>
                            <i className='fas fa-arrow-right'></i>
                        </div>
                    </div>
                    <div className='list-container'>
                    {arrDoctors && arrDoctors.length>0 
                            && arrDoctors.map((item, index) => {
                                let imgBase64 = '';
                                if(item.image){
                                    imgBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                                return (
                                    <div className='list-detail' key={index} onClick={()=> this.handleViewDetailDoctor(item)}>
                                        <div 
                                            className='content-left'
                                            style={{backgroundImage: `url(${imgBase64})`}}    
                                        ></div>
                                        <div className='content-right'>
                                            <div className='name'>{language === LANGUAGES.VI ? nameVi :nameEn}</div>
                                            <div className='specialty'>{item.Doctor_Info && item.Doctor_Info.Specialty && item.Doctor_Info.Specialty && item.Doctor_Info.Specialty.name ?
                                                    item.Doctor_Info.Specialty.name : '...'
                                            }</div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div>
                    <HomeFooter/>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctor);
