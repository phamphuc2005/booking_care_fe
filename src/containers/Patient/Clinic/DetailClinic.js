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
            arrDoctorId_vi: [],
            arrDoctorId_en: [],
            dataDetailClinic_vi: {},
            dataDetailClinic_en: {},
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
                let data_vi = res.data_vi;
                let data_en = res.data_en;
                let arrDoctorId_vi = []
                let arrDoctorId_en = []
                if(data_vi && !_.isEmpty(res.data_vi)) {
                    let arr = data_vi.doctorClinic;
                    if(arr && arr.length>0) {
                        arr.map(item => {
                            arrDoctorId_vi.push(item.doctorId)
                        })
                    }
                }
                if(data_en && !_.isEmpty(res.data_en)) {
                    let arr = data_vi.doctorClinic;
                    if(arr && arr.length>0) {
                        arr.map(item => {
                            arrDoctorId_en.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic_vi: res.data_vi,
                    dataDetailClinic_en: res.data_en,
                    arrDoctorId_vi: arrDoctorId_vi,
                    arrDoctorId_en: arrDoctorId_en,
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
        let {arrDoctorId_vi, dataDetailClinic_vi, dataDetailClinic_en} = this.state;
        let {language} = this.props;
        return (
            <React.Fragment>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Loading...'
                >
                    <HomeHeader isShowBanner={false}/>
                {language === LANGUAGES.VI ?
                    <>
                        <div className='clinic-img' style={{backgroundImage: `url(${dataDetailClinic_vi.image})`}}></div>
                        {dataDetailClinic_vi && !_.isEmpty(dataDetailClinic_vi) &&
                            <div className='clinic-info'>
                                <div className='name'>{dataDetailClinic_vi.name}</div>
                                <div className='address'>
                                    <i className="fas fa-map-marker-alt"></i>
                                    {dataDetailClinic_vi.address}
                                </div>
                            </div>
                        }
                        <div className='description-specialty' >
                            {dataDetailClinic_vi && !_.isEmpty(dataDetailClinic_vi) &&
                                <div className='description' dangerouslySetInnerHTML={{__html: dataDetailClinic_vi.descriptionHTML}}          
                            ></div>
                            }
                        </div>
                        <div className='list-doctor'>
                            <div className='list-doctor-title'><FormattedMessage id = "patient.clinic.doctor-list-title"/></div>
                            {arrDoctorId_vi && arrDoctorId_vi.length>0 &&
                            arrDoctorId_vi.map((item, index)=> {
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
                    </> : 
                    <>
                        <div className='clinic-img' style={{backgroundImage: `url(${dataDetailClinic_vi.image})`}}></div>
                        {dataDetailClinic_en && !_.isEmpty(dataDetailClinic_en) &&
                            <div className='clinic-info'>
                                <div className='name'>{dataDetailClinic_en.name_en}</div>
                                <div className='address'>
                                    <i className="fas fa-map-marker-alt"></i>
                                    {dataDetailClinic_en.address_en}
                                </div>
                            </div>
                        }
                        <div className='description-specialty' >
                            {dataDetailClinic_en && !_.isEmpty(dataDetailClinic_en) &&
                                <div className='description' dangerouslySetInnerHTML={{__html: dataDetailClinic_en.descriptionHTML_en}}          
                            ></div>
                            }
                        </div>
                        <div className='list-doctor'>
                            <div className='list-doctor-title'><FormattedMessage id = "patient.clinic.doctor-list-title"/></div>
                            {arrDoctorId_vi && arrDoctorId_vi.length>0 &&
                            arrDoctorId_vi.map((item, index)=> {
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
                    </>
                }
                
                
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
