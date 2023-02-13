import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorMoreInfo from '../Doctor/DoctorMoreInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import LoadingOverlay from 'react-loading-overlay';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId_vi: [],
            arrDoctorId_en: [],
            dataDetailSpecialty_vi: {},
            dataDetailSpecialty_en: {},
            listProvince: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });

            let resProvince = await getAllCodeService('PROVINCE')

            if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
                let data_vi = res.data_vi;
                let data_en = res.data_en;
                let arrDoctorId_vi = [];
                let arrDoctorId_en = [];
                if(data_vi && !_.isEmpty(res.data_vi)) {
                    let arr = data_vi.doctorSpecialty;
                    if(arr && arr.length>0) {
                        arr.map(item => {
                            arrDoctorId_vi.push(item.doctorId)
                        })
                    }
                }
                if(data_en && !_.isEmpty(res.data_en)) {
                    let arr = data_en.doctorSpecialty;
                    if(arr && arr.length>0) {
                        arr.map(item => {
                            arrDoctorId_en.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if(dataProvince && dataProvince.length>0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueVi: "Toàn quốc",
                        valueEn: "ALL"
                    })
                }
                this.setState({
                    dataDetailSpecialty_vi: res.data_vi,
                    dataDetailSpecialty_en: res.data_en,
                    arrDoctorId_vi: arrDoctorId_vi,
                    arrDoctorId_en: arrDoctorId_en,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handeOnChangeSelect = async (event) => {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            });

            if(res && res.errCode === 0 ){
                let data_vi = res.data_vi;
                let data_en = res.data_en;
                let arrDoctorID_vi = [];
                let arrDoctorID_en = [];
                if(data_vi && !_.isEmpty(res.data_vi)) {
                    let arr = data_vi.doctorSpecialty;
                    if(arr && arr.length>0) {
                        arr.map(item => {
                            arrDoctorID_vi.push(item.doctorId)
                        })
                    }
                }
                if(data_en && !_.isEmpty(res.data_en)) {
                    let arr = data_en.doctorSpecialty;
                    if(arr && arr.length>0) {
                        arr.map(item => {
                            arrDoctorID_en.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty_vi: res.data_vi,
                    dataDetailSpecialty_en: res.data_en,
                    arrDoctorId_vi: arrDoctorID_vi,
                    arrDoctorId_en: arrDoctorID_en,
                })
            }
        }
    }

    setLoading = (setLoading) => {
        this.setState({
            ...this.state,
            isLoading: setLoading
        })
    }

    render() {
        let {arrDoctorId_vi, arrDoctorId_en, dataDetailSpecialty_vi, dataDetailSpecialty_en, listProvince} = this.state;
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
                        <div className='description-specialty' style={{backgroundImage: `url(${dataDetailSpecialty_vi.image})`}}>
                            {dataDetailSpecialty_vi && !_.isEmpty(dataDetailSpecialty_vi) &&
                                <div className='description' dangerouslySetInnerHTML={{__html: dataDetailSpecialty_vi.descriptionHTML}}></div>
                            }
                        </div>
                        <div className='search-doctor-by-location'>
                            <select onChange={(event)=>this.handeOnChangeSelect(event)}>
                                {listProvince && listProvince.length>0 &&
                                listProvince.map((item, index) => {
                                    return(
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        <div className='list-doctor'>
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
                        <div className='description-specialty' style={{backgroundImage: `url(${dataDetailSpecialty_en.image})`}}>
                            {dataDetailSpecialty_en && !_.isEmpty(dataDetailSpecialty_en) &&
                                <div className='description' dangerouslySetInnerHTML={{__html: dataDetailSpecialty_en.descriptionHTML}}></div>
                            }
                        </div>
                        <div className='search-doctor-by-location'>
                            <select onChange={(event)=>this.handeOnChangeSelect(event)}>
                                {listProvince && listProvince.length>0 &&
                                listProvince.map((item, index) => {
                                    return(
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        <div className='list-doctor'>
                            {arrDoctorId_en && arrDoctorId_en.length>0 &&
                            arrDoctorId_en.map((item, index)=> {
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
