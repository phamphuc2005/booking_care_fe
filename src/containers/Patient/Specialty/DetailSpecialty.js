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

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [39, 41]
        }
    }

    async componentDidMount() {

    }

    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.language !== prevProps.language) {
        //     let allDates = this.getArrDates(this.props.language);
        //     this.setState({
        //         allDates: allDates
        //     })
        // }
    }

    render() {
        let {arrDoctorId} = this.state;
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false}/>
                <div className='description-specialty'>
                    
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
