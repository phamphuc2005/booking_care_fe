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

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            // this.setState({
                
            // })
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });

            let resProvince = await getAllCodeService('PROVINCE')

            if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
                let data = res.data;
                let arrDoctorId = []
                if(data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length>0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
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
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
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

    handeOnChangeSelect = async (event) => {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            });

            if(res && res.errCode === 0 ){
                let data = res.data;
                let arrDoctorID = [];
                if(data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length>0) {
                        arr.map(item => {
                            arrDoctorID.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorID,
                })
            }
        }
    }

    render() {
        let {arrDoctorId, dataDetailSpecialty, listProvince} = this.state;
        let {language} = this.props;
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false}/>
                <div className='description-specialty' style={{backgroundImage: `url(${dataDetailSpecialty.image})`}}>
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                        <div className='description' dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML}}
                        
                    ></div>
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
