import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ListSpecialty.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorMoreInfo from '../Doctor/DoctorMoreInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import { getAllSpecialty } from '../../../services/userService';
import _ from 'lodash';

class ListSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if(res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.language !== prevProps.language) {
        //     let allDates = this.getArrDates(this.props.language);
        //     this.setState({
        //         allDates: allDates
        //     })
        // }
    }

    handleViewDetailSpecialty = (specialty) => {
        console.log(specialty);
        if(this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
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
        let {dataSpecialty} = this.state;
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false}/>
                <div className='list-specialties'>
                    <div className='list-header'>
                        <div className='back-btn' onClick={()=>this.handleBack()}>
                            <i className='fas fa-arrow-left'></i>
                        </div>
                        <FormattedMessage id="section.list-specialty"/>
                        <div className='next-btn' onClick={()=>this.handleNext()}>
                            <i className='fas fa-arrow-right'></i>
                        </div>
                    </div>
                    <div className='list-container'>
                    {dataSpecialty && dataSpecialty.length>0 && 
                            dataSpecialty.map((item, index)=>{
                                return (
                                    <div className='list-detail' key={index} onClick={()=> this.handleViewDetailSpecialty(item)}>
                                        <div 
                                            className='content-left'
                                            style={{backgroundImage: `url(${item.image})`}}    
                                        ></div>
                                        <div className='content-right'>
                                            <div className='name'>{item.name}</div>
                                            
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div>
                    <HomeFooter/>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);
