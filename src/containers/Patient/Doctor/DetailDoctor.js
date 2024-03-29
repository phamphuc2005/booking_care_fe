import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailDoctor.scss';
import {getDetailDoctor} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorMoreInfo from './DoctorMoreInfo'
import LoadingOverlay from 'react-loading-overlay';
import Comment from '../SocialPlugin/Comment';
import LikeShare from '../SocialPlugin/Like&Share';
import { FormattedMessage } from 'react-intl';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
            isLoading: false
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailDoctor(id);
            if(res && res.errCode === 0){
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    setLoading = (setLoading) => {
        this.setState({
            ...this.state,
            isLoading: setLoading
        })
    }

    render() {
        let {language} = this.props;
        let {detailDoctor} = this.state;
        let nameVi = '', nameEn = '';
        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        let currentURL = window.location.href;
        return (
            <React.Fragment>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Loading...'
                >
                    <HomeHeader isShowBanner={false}/>
                <div className='detail-doctor-container'>
                    <div className='intro-doctor'>
                        <div 
                            className='content-left'
                            style={{backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`}}
                        ></div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi :nameEn}
                            </div>
                            <div className='down'>
                                {language === LANGUAGES.VI ?
                                    <>
                                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&                               
                                            <span>{detailDoctor.Markdown.description}</span>                       
                                        }
                                    </> :
                                    <>
                                        {detailDoctor && detailDoctor.Markdown_En && detailDoctor.Markdown_En.description &&                               
                                            <span>{detailDoctor.Markdown_En.description}</span>                       
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorID={this.state.currentDoctorId}
                                setLoadingData={this.setLoading}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorMoreInfo
                                doctorID={this.state.currentDoctorId}
                            />
                        </div>
                    </div>

                    <div className='detail-info-doctor'>
                        {language === LANGUAGES.VI ?
                                    <>
                                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                            <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}></div>
                                        }
                                    </> :
                                    <>
                                        {detailDoctor && detailDoctor.Markdown_En && detailDoctor.Markdown_En.contentHTML &&
                                            <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown_En.contentHTML}}></div>
                                        }
                                    </>
                                }
                    </div>

                    <div className='comment-doctor'>
                        <div className='comment-title'><FormattedMessage id = "comment.title"/></div>
                        {/* <div className='like_share'>
                            <LikeShare/>
                        </div> */}
                        <Comment
                            // dataHref={currentURL}
                            // width={"100%"}
                            doctorID={this.props.match.params.id}
                        />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
