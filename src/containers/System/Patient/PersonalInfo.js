import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './PersonalInfo.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import {CommonUtils, CRUD_ACTIONS, LANGUAGES} from '../../../utils';
import {getDetailDoctor, editUserService} from '../../../services/userService'
import { toast } from 'react-toastify';

class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {

            image: '',
            firstName: '',
            lastName: '',
            email: '',
            phonenumber: '',
            positionId: '',
            gender: '',
            address: '',
            patientGender: '',
            patientPosition: '',

            genderArr: [],
            positionArr: [],
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();

        let patient = await getDetailDoctor(this.props.userInfo.id);
        let arrGenders = this.props.genderRedux;
        if(patient && patient.errCode === 0 && patient.data) {
            this.setState({
                id: this.props.userInfo.id,
                firstName: patient.data.firstName,
                lastName: patient.data.lastName,
                email: patient.data.email,
                phonenumber: patient.data.phonenumber,
                address: patient.data.address,
                gender: arrGenders && arrGenders.length>0 ? arrGenders[0].keyMap : '',
                positionId: "P0",
                image: patient.data.image,
                patientGender: patient.data.genderData,
                patientPosition: patient.data.positionData,
                roleId: "R2",
                avatar: ''
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
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState ({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length>0 ? arrGenders[0].keyMap : ''
            })
        }
    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                avatar: base64,
                image: base64
            })
        }
    }

    handleEditPatient = async () => {
        try {
            let res = await editUserService(this.state)
            if(res && res.errCode === 0) {
                toast.success("Update info for success!");
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage);
            }
        } catch (error) {
            toast.error("Update info for failed!");
            console.log(error)
        }
    }

    render() {
        let {userInfo, language} = this.props;
        let genders = this.state.genderArr;
        return (
            <div className='container patient-container'>
                <div className='title mb-4'><FormattedMessage id = "patient-manage.title"/></div>

                <div className='row my-4 patient-details'>
                    <div className='col-2'>
                        <input className=' my-4 avatar ml-3' type='file'
                            style={{backgroundImage: `url(${this.state.image})`}}
                            onChange={(event)=>{this.handleOnChangeImg(event, "image")}}    
                        >
                        </input>

                    </div>
                    <div className='row col-10 mt-4 more-info ml-2'>
                        <div className='form-group col-4'>
                            <label><FormattedMessage id = "patient-manage.firstname"/>:</label>
                            <input className='form-control'
                                value={this.state.firstName}
                                onChange={(event)=>{this.onChangeInput(event, "firstName")}}
                            />
                        </div>
                        <div className='form-group col-4'>
                            <label><FormattedMessage id = "patient-manage.lastname"/>:</label>
                            <input className='form-control'
                                value={this.state.lastName}
                                onChange={(event)=>{this.onChangeInput(event, "lastName")}}
                            />
                        </div>
                        <div className='form-group col-4'>
                            <label>Email:</label>
                            <input className='form-control'
                                value={this.state.email}
                            />
                        </div>
                        <div className='form-group col-4'>
                            <label><FormattedMessage id = "patient-manage.phone"/>:</label>
                            <input className='form-control'
                                value={this.state.phonenumber}
                                onChange={(event)=>{this.onChangeInput(event, "phonenumber")}}
                            />
                        </div>
                        <div className='form-group col-4'>
                            <label><FormattedMessage id = "patient-manage.address"/>:</label>
                            <input className='form-control'
                                value={this.state.address}
                                onChange={(event)=>{this.onChangeInput(event, "address")}}
                            />
                        </div>
                        <div className='form-group col-4'>
                            <label><FormattedMessage id = "patient-manage.gender"/>:</label>
                            <select 
                                className='form-control gender'
                                onChange={(event)=>{this.onChangeInput(event, "gender")}}

                            >
                                <option selected disabled hidden>{language === LANGUAGES.VI ? this.state.patientGender.valueVi : this.state.patientGender.valueEn}</option>
                                {genders && genders.length>0 && genders.map((item, index) => {
                                    return (
                                        <option selected={false} key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='col-12 mt-2 mb-4'>
                        <button 
                            className='btn btn-warning edit-btn text-light'
                            onClick={() => this.handleEditPatient()}
                        >
                            <FormattedMessage id = "patient-manage.edit"/> 
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
