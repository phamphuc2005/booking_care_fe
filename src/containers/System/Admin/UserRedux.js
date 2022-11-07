import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES} from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgUrl: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        this.props.getPositionStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux) {
            this.setState ({
                genderArr: this.props.genderRedux
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux) {
            this.setState ({
                roleArr: this.props.roleRedux
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux) {
            this.setState ({
                positionArr: this.props.positionRedux
            })
        }
    }

    handleOnChangeImg = (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl
            })
        }
    }

    openPreviewImg = () => {
        if(!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;

        return (
            <div className='user-redux-container'>
                <div className='title'>User redux</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mt-2 mb-4'>-- <FormattedMessage id = "user-manage.create-title"/> --</div>
                            <div className='col-3'>
                                <label>Email:</label>
                                <input 
                                    className='form-control'
                                    type='email' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.password"/>:</label>
                                <input 
                                    className='form-control'
                                    type='password' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.firstname"/>:</label>
                                <input 
                                    className='form-control'
                                    type='text' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.lastname"/>:</label>
                                <input 
                                    className='form-control'
                                    type='text' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id = "user-manage.phone"/>:</label>
                                <input 
                                    className='form-control'
                                    type='number' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-8'>
                                <label><FormattedMessage id = "user-manage.address"/>:</label>
                                <input 
                                    className='form-control'
                                    type='text' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.gender"/>:</label>
                                <select className='form-control'>
                                    <option value="">-- Choose option --</option>
                                    {genders && genders.length>0 && genders.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select> 
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.role"/>:</label>
                                <select className='form-control'>
                                    <option value="">-- Choose option --</option>
                                    {roles && roles.length>0 && roles.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select> 
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.position"/>:</label>
                                <select className='form-control'>
                                    <option value="">-- Choose option --</option>
                                    {positions && positions.length>0 && positions.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select> 
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.avatar"/>:</label>
                                <div className='img-container'>
                                    <input 
                                        id='previewImg' 
                                        type='file' 
                                        hidden
                                        onChange={(event) => this.handleOnChangeImg(event)}
                                    />
                                    <div 
                                        className='preview-img'
                                        style={{backgroundImage: `url(${this.state.previewImgUrl})`}}
                                        onClick = {() => this.openPreviewImg()}
                                    >
                                    </div>
                                    <label className='upload-label' htmlFor='previewImg'>
                                        <i className="fas fa-upload"></i>
                                        <FormattedMessage id = "user-manage.upload"/>
                                    </label>
                                </div>
                            </div>
                            <div className='col-12 mt-4'>
                                <button className='btn btn-primary'><FormattedMessage id = "user-manage.save-btn"/></button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
