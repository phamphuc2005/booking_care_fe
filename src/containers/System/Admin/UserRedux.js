import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUser from './TableUser';
import TrashUser from './TrashUser';
import { toast } from 'react-toastify';
import 'bootstrap'; 

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',

            action: '',
            userEditId: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        this.props.getPositionStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState ({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length>0 ? arrGenders[0].keyMap : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState ({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length>0 ? arrRoles[0].keyMap : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState ({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length>0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.listUser !== this.props.listUser) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: arrGenders && arrGenders.length>0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length>0 ? arrRoles[0].keyMap : '',
                position: arrPositions && arrPositions.length>0 ? arrPositions[0].keyMap : '',
                avatar: '',
                previewImgUrl: '', 
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImg = () => {
        if(!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;
        let {action} = this.state;

        if(action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if(action === CRUD_ACTIONS.EDIT) {
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        
        this.props.fetchUserRedux();
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address', 'gender', 'role', 'position'];
        for(let i=0; i<arrCheck.length; i++) {
            if(!this.state[arrCheck[i]]) {
                isValid = false;
                toast.warning('Thiếu dữ liệu: ' + arrCheck[i]);

                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserRedux = (user) => {
        let imgBase64 = '';
        if(user.image){
            imgBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: ' ',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgUrl: imgBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;

        let {email, password, firstName, lastName, phonenumber, address, gender, role, position, avatar} = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title'><FormattedMessage id = "usermanage.title"/></div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row create-row'>
                            <div className='col-12 mb-4 create-title'>
                                -- {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id = "user-manage.edit-title"/> : <FormattedMessage id = "user-manage.create-title"/>}  --
                            </div>
                            <div className='col-3'>
                                <label>Email:</label>
                                <input 
                                    className='form-control'
                                    type='email' 
                                    onChange={(event)=>{this.onChangeInput(event, "email")}}
                                    value={email}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.password"/>:</label>
                                <input 
                                    className='form-control'
                                    type='password' 
                                    onChange={(event)=>{this.onChangeInput(event, "password")}}
                                    value={password}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.firstname"/>:</label>
                                <input 
                                    className='form-control'
                                    type='text' 
                                    onChange={(event)=>{this.onChangeInput(event, "firstName")}}
                                    value={firstName}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.lastname"/>:</label>
                                <input 
                                    className='form-control'
                                    type='text' 
                                    onChange={(event)=>{this.onChangeInput(event, "lastName")}}
                                    value={lastName}
                                />
                            </div>
                            <div className='col-4 mt-2'>
                                <label><FormattedMessage id = "user-manage.phone"/>:</label>
                                <input 
                                    className='form-control'
                                    type='number' 
                                    onChange={(event)=>{this.onChangeInput(event, "phonenumber")}}
                                    value={phonenumber}
                                />
                            </div>
                            <div className='col-8 mt-2'>
                                <label><FormattedMessage id = "user-manage.address"/>:</label>
                                <input 
                                    className='form-control'
                                    type='text' 
                                    onChange={(event)=>{this.onChangeInput(event, "address")}}
                                    value={address}
                                />
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id = "user-manage.gender"/>:</label>
                                <select 
                                    className='form-control'
                                    onChange={(event)=>{this.onChangeInput(event, "gender")}}
                                    value={gender}
                                >
                                    {genders && genders.length>0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select> 
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id = "user-manage.role"/>:</label>
                                <select 
                                    className='form-control'
                                    onChange={(event)=>{this.onChangeInput(event, "role")}}
                                    value={role}
                                >
                                    {roles && roles.length>0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select> 
                            </div>
                            <div className='col-3 mt-2'>
                                <label><FormattedMessage id = "user-manage.position"/>:</label>
                                <select 
                                    className='form-control'
                                    onChange={(event)=>{this.onChangeInput(event, "position")}}
                                    value={position}
                                >
                                    {positions && positions.length>0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select> 
                            </div>
                            <div className='col-3 mt-2'>
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
                            <div className='col-12 my-4'>
                                <button 
                                    className='btn btn-primary'
                                    onClick={()=>this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id = "user-manage.save-btn"/> : <FormattedMessage id = "user-manage.create-btn"/>} 
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className='nav-list container px-0'>
                    <ul className="nav nav-pills mt-4" id="pills-tab" role="tablist">
                        <li className="nav-item nav-item-1">
                            <a className="nav-link link-1 active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                <i className="fas fa-list"></i>
                                <FormattedMessage id = "user-manage.table-title"/>
                            </a>
                        </li>
                        <li className="nav-item item-2">
                            <a className="nav-link link-2" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                                <i className="fas fa-trash-alt"></i> 
                                <FormattedMessage id = "user-manage.trash"/>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <TableUser
                                handleEditUserRedux={this.handleEditUserRedux}
                                action={this.state.action}
                            />
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <TrashUser
                                handleEditUserRedux={this.handleEditUserRedux}
                                action={this.state.action}
                            />
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
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
