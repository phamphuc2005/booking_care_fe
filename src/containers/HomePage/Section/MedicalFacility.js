import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic_vi: [],
            dataClinic_en: [],
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if(res && res.errCode === 0) {
            this.setState({
                dataClinic_vi: res.data_vi ? res.data_vi : [],
                dataClinic_en: res.data_en ? res.data_en : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        console.log(clinic);
        if(this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    handleListClinic = (clinic) => {
        if(this.props.history) {
            this.props.history.push(`/list-clinic`)
        }
    }

    render() {
        let {dataClinic_vi, dataClinic_en} = this.state;
        return (
            <div className='section-share section-medicalfacility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id = "section.medicalfacility"/></span>
                        <button className='btn-section' onClick={()=>this.handleListClinic()}><FormattedMessage id = "section.more-btn"/></button>
                    </div>
                    <div className='section-body'>
                        {this.props.language === LANGUAGES.VI ? 
                            <Slider {...this.props.settings}>
                            {dataClinic_vi && dataClinic_vi.length>0 && 
                                dataClinic_vi.map((item, index)=>{
                                    return (
                                        <div className='section-customize' key={index} onClick={()=> this.handleViewDetailClinic(item)}>
                                            <div className='outer-bg'>
                                                <div 
                                                    className='background-img img-specialty'
                                                    style={{backgroundImage: `url(${item.image})`}}
                                                >
                                                </div>
                                            </div>
                                            <div className='position text-center'>{item.name}</div>
                                        </div>
                                    )
                                })}
                            </Slider> :
                            <Slider {...this.props.settings}>
                            {dataClinic_en && dataClinic_en.length>0 && 
                                dataClinic_en.map((item, index)=>{
                                    return (
                                        <div className='section-customize' key={index} onClick={()=> this.handleViewDetailClinic(item)}>
                                            <div className='outer-bg'>
                                                <div 
                                                    className='background-img img-specialty'
                                                    style={{backgroundImage: `url(${item.image_en})`}}
                                                >
                                                </div>
                                            </div>
                                            <div className='position text-center'>{item.name_en}</div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        }
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
