import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty_vi: [],
            dataSpecialty_en: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if(res && res.errCode === 0) {
            this.setState({
                dataSpecialty_vi: res.data_vi ? res.data_vi : [],
                dataSpecialty_en: res.data_en ? res.data_en : []
            })
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        if(this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }

    handleListSpecialty = () => {
        if(this.props.history) {
            this.props.history.push(`/list-specialty`)
        }
    }

    render() {
        let {dataSpecialty_vi, dataSpecialty_en} = this.state;
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id = "section.specialty"/></span>
                        <button className='btn-section' onClick={()=> this.handleListSpecialty()}><FormattedMessage id ="section.more-btn"/></button>
                    </div>
                    <div className='section-body'>
                        {this.props.language === LANGUAGES.VI ?
                            <Slider {...this.props.settings}>
                                {dataSpecialty_vi && dataSpecialty_vi.length>0 && 
                                dataSpecialty_vi.map((item, index)=>{
                                    return (
                                        <div className='section-customize' key={index} onClick={()=> this.handleViewDetailSpecialty(item)}>
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
                                {dataSpecialty_en && dataSpecialty_en.length>0 && 
                                dataSpecialty_en.map((item, index)=>{
                                    return (
                                        <div className='section-customize' key={index} onClick={()=> this.handleViewDetailSpecialty(item)}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
