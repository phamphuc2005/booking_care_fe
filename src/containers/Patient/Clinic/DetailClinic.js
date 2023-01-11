import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorMoreInfo from '../Doctor/DoctorMoreInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import LoadingOverlay from 'react-loading-overlay';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            isLoading: false
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;

            let res = await getDetailClinicById({
                id: id,
            });

            if(res && res.errCode === 0 ){
                let data = res.data;
                let arrDoctorId = []
                if(data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if(arr && arr.length>0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
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

    setLoading = (setLoading) => {
        this.setState({
            ...this.state,
            isLoading: setLoading
        })
        // console.log('load',this.state);
    }

    render() {
        let {arrDoctorId, dataDetailClinic} = this.state;
        let {language} = this.props;
        return (
            <React.Fragment>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Loading...'
                >
                    <HomeHeader isShowBanner={false}/>
                <div className='clinic-img' style={{backgroundImage: `url(${dataDetailClinic.image})`}}></div>
                {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                    <div className='clinic-info'>
                        <div className='name'>{dataDetailClinic.name}</div>
                        <div className='address'>
                            <i className="fas fa-map-marker-alt"></i>
                            {dataDetailClinic.address}
                        </div>
                    </div>
                }
                <div className='description-specialty' >
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                        <div className='description' dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}}          
                    ></div>
                    }
                </div>
                <div className='list-doctor'>
                    <div className='list-doctor-title'><FormattedMessage id = "patient.clinic.doctor-list-title"/></div>
                    {arrDoctorId && arrDoctorId.length>0 &&
                    arrDoctorId.map((item, index)=> {
                        return(
                            <div className='detail-doctor' key={index}>
                                <div className='content_left'>
                                    <ProfileDoctor
                                        doctorId={item}
                                        isShowDescription={true}
                                        isShowLink={true}
                                        isShowPrice={false}
                                        // dataTime={dataTime}
                                    >
                                    </ProfileDoctor>
                                </div>
                                <div className='content_right'>
                                    <div className='doctor-schedule'>
                                        <DoctorSchedule
                                            doctorID={item}
                                            setLoadingData={this.setLoading}
                                        />
                                    </div>
                                    <div className='doctor-info'>
                                        <DoctorMoreInfo
                                            doctorID={item}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        )
                    })}
                </div>
                <div>
                    <HomeFooter/>
                </div>
                </LoadingOverlay>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
