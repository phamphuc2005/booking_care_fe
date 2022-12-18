import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ListClinic.scss';
import { getAllClinic } from '../../../services/userService';
import _ from 'lodash';

class ListClinic extends Component {
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

    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.language !== prevProps.language) {
        //     let allDates = this.getArrDates(this.props.language);
        //     this.setState({
        //         allDates: allDates
        //     })
        // }
    }

    handleViewDetailClinic = (clinic) => {
        console.log(clinic);
        if(this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
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
        let {dataClinic} = this.state;
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false}/>
                <div className='list-clinics'>
                    <div className='list-header'>
                        <div className='back-btn' onClick={()=>this.handleBack()}>
                            <i className='fas fa-arrow-left'></i>
                        </div>
                        <FormattedMessage id="section.list-clinic"/>
                        <div className='next-btn' onClick={()=>this.handleNext()}>
                            <i className='fas fa-arrow-right'></i>
                        </div>
                    </div>
                    <div className='list-container'>
                    {dataClinic && dataClinic.length>0 && 
                            dataClinic.map((item, index)=>{
                                return (
                                    <div className='list-detail' key={index} onClick={()=> this.handleViewDetailClinic(item)}>
                                        <div 
                                            className='content-left'
                                            style={{backgroundImage: `url(${item.image})`}}    
                                        ></div>
                                        <div className='content-right'>
                                            <div className='name'>{item.name}</div>
                                            <div className='address'><i className="fas fa-map-marker-alt"></i>{item.address}</div>                             
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

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
