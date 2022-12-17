import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if(res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        console.log(clinic);
        if(this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let {dataClinic} = this.state;
        return (
            <div className='section-share section-medicalfacility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id = "section.medicalfacility"/></span>
                        <button className='btn-section'><FormattedMessage id = "section.more-btn"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                        {dataClinic && dataClinic.length>0 && 
                            dataClinic.map((item, index)=>{
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
                        </Slider>
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
