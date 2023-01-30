import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import * as actions from "../../store/actions";
import { withRouter } from 'react-router';
import { Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { getUserInfo } from '../../services/userService';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//   import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class HomeHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedFilter: 1,
            listDoctors: [],
            listSpecialty: [],
            listClinic: [],
            selectedDoctor: '',
            selectedSpecialty: '',
            selectedClinic: '',
            image: '',
            firstName: '',
            lastName: ''
        }
    }

    async componentDidMount() {
        await this.props.fetchAllDoctors();
        await this.props.getRequiredDoctorInfo();
        await this.getUser();
    }

    getUser = async () => {
        let response = await getUserInfo({id: this.props.userInfo.id});
        if(response && response.errCode === 0) {
            this.setState ({
                image: response.data.image,
                firstName: response.data.firstName,
                lastName: response.data.lastName
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let {resSpecialty, resClinic} = this.props.allRequiredDoctorInfo
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
            
            this.setState({
                listDoctors: dataSelect,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }
        if(prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo){
            let { resSpecialty, resClinic} = this.props.allRequiredDoctorInfo
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
            this.setState({
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        } 
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let {language} = this.props;
        if(inputData && inputData.length>0) {
            if(type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    let labelEn = `${item.lastName} ${item.firstName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id;
                    result.push(object);
                })
            }
            if(type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if(type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
        }
        return result;
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    
    returnHome = () => {
        if(this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    returnLogin = () => {
        if(this.props.history) {
            this.props.history.push(`/login`)
        }
    }

    returnRegister = () => {
        if(this.props.history) {
            this.props.history.push(`/register`)
        }
    }

    returnUserManage = () => {
        if(this.props.history) {
            this.props.history.push(`/system/user-manage`)
        }
    }

    handleListDoctor = () => {
        if(this.props.history) {
            this.props.history.push(`/list-doctor`)
        }
    }

    handleListClinic = () => {
        if(this.props.history) {
            this.props.history.push(`/list-clinic`)
        }
    }

    handleListSpecialty = () => {
        if(this.props.history) {
            this.props.history.push(`/list-specialty`)
        }
    }

    handleFilter = (event) => {
        this.setState({
            selectedFilter: event
        })
        // alert(this.state.selectedFilter)
    }

    handleChangeSelect = (name) => {
        if(this.state.selectedFilter === 1) {
            this.setState({selectedDoctor: name})
        } else if(this.state.selectedFilter === 2) {
            this.setState({selectedSpecialty: name})
        } else {
            this.setState({selectedClinic: name})
        }
    }

    handleSearch = () => {
        if(this.props.history) {
            if(this.state.selectedFilter === 1 && this.state.selectedDoctor.value) {
                this.props.history.push(`/detail-doctor/${this.state.selectedDoctor.value}`)
            } 
            if(this.state.selectedFilter === 2 && this.state.selectedSpecialty.value) {
                this.props.history.push(`/detail-specialty/${this.state.selectedSpecialty.value}`)
            } 
            if(this.state.selectedFilter === 3 && this.state.selectedClinic.value) {
                this.props.history.push(`/detail-clinic/${this.state.selectedClinic.value}`)
            }
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            setTimeout(function(){this.handleSearch()}.bind(this), 1000);
        }
    }

    render() {
        let language = this.props.language;
        let isLoggedIn = this.props.isLoggedIn;
        let processLogout = this.props.processLogout;
        let {selectedFilter} = this.state;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <Dropdown className='dropdown'>
                                <Dropdown.Toggle className='icon'  id="dropdown-basic" >
                                    <i className="fas fa-bars"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='menu'>
                                    <Dropdown.Item className='item' href="" onClick={()=>this.returnHome()}>
                                        <i className='fas fa-home'></i>
                                        <FormattedMessage id="homeheader.home"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item className='item' href="" onClick={()=>this.handleListDoctor()}>
                                        <i className='fas fa-user-md'></i>
                                        <FormattedMessage id="homeheader.list-doctor"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item className='item' href="" onClick={()=>this.handleListSpecialty()}>
                                        <i className="fas fa-first-aid"></i>
                                        <FormattedMessage id="homeheader.list-specialty"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item className='item' href="" onClick={()=>this.handleListClinic()}>
                                        <i className='fas fa-hospital-alt'></i>
                                        <FormattedMessage id="homeheader.list-clinic"/>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className='header-logo' onClick={()=>this.returnHome()}></div>
                        </div>
                        {/* <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.healthfacility"/></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.choosehospital"/></div>
                                </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.choosedoctor"/></div>
                                </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.checkpackage"/></b></div>
                                    <div className='subs-title'><FormattedMessage id="homeheader.generalexamination"/></div>
                                </div>
                        </div> */}
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support"/>
                            </div>
                            <div><i className="fas fa-globe languages"></i></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            {isLoggedIn ? 
                                <>
                                <span className='welcome'>
                                        <Dropdown className='image'>
                                            {/* <Dropdown.Toggle className='avatar'  id="dropdown-basic" ></Dropdown.Toggle> */}
                                            {this.state.image ?
                                                <Dropdown.Toggle className='avatar' id="dropdown-basic"
                                                    style={{backgroundImage: `url(${new Buffer(this.state.image, 'base64').toString('binary')})`}}
                                                ></Dropdown.Toggle> :
                                                <Dropdown.Toggle className='avatar' id="dropdown-basic"
                                                    style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnmqNl25_iCHNWRwqjgYDZlZtgh2LPB1NZJxkS5IMAkh5m5xxRNV_--WHa_cVbUR0wKg&usqp=CAU)`}}
                                                ></Dropdown.Toggle>
                                            }
                                            <Dropdown.Menu className='menu'>
                                                <Dropdown.Item className='item item-1' href="" disabled>
                                                    <i className='fas fa-user'></i>
                                                    {this.state.firstName ? this.state.firstName : ''} {this.state.lastName ? this.state.lastName : ''}
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item className='item' href="" onClick={()=>this.returnUserManage()}>
                                                    <i className='fas fa-cog'></i>
                                                    <FormattedMessage id="homeheader.manage"/>
                                                </Dropdown.Item>
                                                <Dropdown.Item className='item' href="" onClick={processLogout}>
                                                    <i className="fas fa-sign-out-alt"></i>
                                                    <FormattedMessage id="homeheader.logout"/>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                </span>
                                </> :
                                <>
                                    <span className='login-btn' onClick={()=>this.returnLogin()}>
                                        <i className="fas fa-sign-in-alt"></i>
                                        <FormattedMessage id = "homeheader.login"/>
                                    </span>
                                    <span className='register-btn' onClick={()=>this.returnRegister()}>
                                        <i className="fas fa-angle-double-right"></i>
                                        <FormattedMessage id = "homeheader.register"/>
                                    </span>
                                </>
                            }
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='banner-up'>
                            <div className='title1'><FormattedMessage id="banner.title1"/></div>
                            <div className='title2'><FormattedMessage id="banner.title2"/></div>
                            <div className='search'>
                                <div className='search-btn' onClick={()=>this.handleSearch()}>
                                    <i className="fas fa-search"></i>
                                </div>
                                <Select 
                                    className="inputSelect"
                                    type='text' 
                                    placeholder={selectedFilter === 1 ? <FormattedMessage id="homeheader.search-doctor"/> : (selectedFilter === 2 ? <FormattedMessage id="homeheader.search-specialty"/> : <FormattedMessage id="homeheader.search-clinic"/>)}
                                    value={selectedFilter === 1 ? this.state.selectedDoctor : (selectedFilter === 2 ? this.state.selectedSpecialty : this.state.selectedClinic)}
                                    onChange={this.handleChangeSelect}
                                    options={selectedFilter === 1 ? this.state.listDoctors : (selectedFilter === 2 ? this.state.listSpecialty : this.state.listClinic)}
                                    onKeyDown = {(event) => this.handleKeyDown(event)}
                                />
                                <Dropdown className='filter'>
                                    <Dropdown.Toggle className='icon'  id="dropdown-basic" >
                                        <i className="fas fa-sliders-h"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='menu'>
                                        <Dropdown.Item className='item' href="" onClick={()=>this.handleFilter(1)}>
                                            <FormattedMessage id="homeheader.filter-doctor"/>
                                        </Dropdown.Item>
                                        <Dropdown.Item className='item' href="" onClick={()=>this.handleFilter(2)}>
                                            <FormattedMessage id="homeheader.filter-specialty"/>
                                        </Dropdown.Item>
                                        <Dropdown.Item className='item' href="" onClick={()=>this.handleFilter(3)}>
                                            <FormattedMessage id="homeheader.filter-clinic"/>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='banner-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="far fa-hospital"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.speciality"/></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="fas fa-briefcase-medical"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.generality"/></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.remote"/></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="fas fa-stethoscope"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.medicaltest"/></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="fas fa-heartbeat"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.mentalhealth"/></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon'>
                                    <i className="fas fa-syringe"></i>
                                    </div>
                                    <div className='text'><FormattedMessage id="banner.dental"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
