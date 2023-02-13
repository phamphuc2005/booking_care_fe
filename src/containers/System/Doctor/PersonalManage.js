import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './PersonalManage.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import {CommonUtils, CRUD_ACTIONS, LANGUAGES} from '../../../utils';
import {getDetailDoctor, editUserService} from '../../../services/userService'
import { Button } from 'reactstrap';
import { editUser } from '../../../store/actions';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class PersonalManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            contentMarkdown_en: '',
            contentHTML_en: '',
            description_en: '',
            selectedDoctor: '',
            listDoctors: [],
            haveData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty_vi: [],
            listClinic_vi: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            specialtyId: '',
            clinicId: '',

            image: '',
            firstName: '',
            lastName: '',
            email: '',
            phonenumber: '',
            positionId: '',
            gender: '',
            doctorGender: '',
            doctorPosition: '',

            genderArr: [],
            positionArr: [],
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();

        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfo();
        let doctor = await getDetailDoctor(this.props.userInfo.id);
        let arrGenders = this.props.genderRedux;
        let arrPositions = this.props.positionRedux;
        if(doctor && doctor.errCode === 0 && doctor.data) {
            this.setState({
                id: this.props.userInfo.id,
                firstName: doctor.data.firstName,
                lastName: doctor.data.lastName,
                email: doctor.data.email,
                phonenumber: doctor.data.phonenumber,
                gender: arrGenders && arrGenders.length>0 ? arrGenders[0].keyMap : '',
                positionId: arrPositions && arrPositions.length>0 ? arrPositions[0].keyMap : '',
                image: doctor.data.image,
                doctorGender: doctor.data.genderData,
                doctorPosition: doctor.data.positionData,
                roleId: "R1",
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
            if(type === 'PRICE' ) {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if(type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if(type === 'SPECIALTY_VI') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if(type === 'SPECIALTY_EN') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if(type === 'CLINIC_VI') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if(type === 'CLINIC_EN') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name_en;
                    object.value = item.id_en;
                    result.push(object);
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let {resPrice, resPayment, resProvince, resSpecialty_vi, resSpecialty_en, resClinic_vi, resClinic_en} = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty_vi = this.buildDataInputSelect(resSpecialty_vi, 'SPECIALTY_VI');
            let dataSelectClinic_vi = this.buildDataInputSelect(resClinic_vi, 'CLINIC_VI');
            let dataSelectSpecialty_en = this.buildDataInputSelect(resSpecialty_en, 'SPECIALTY_EN');
            let dataSelectClinic_en = this.buildDataInputSelect(resClinic_en, 'CLINIC_EN');
            
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty_vi: dataSelectSpecialty_vi,
                listClinic_vi: dataSelectClinic_vi,
                listSpecialty_en: dataSelectSpecialty_en,
                listClinic_en: dataSelectClinic_en
            })
        }
        if(prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo){
            let {resPrice, resPayment, resProvince, resSpecialty_vi, resSpecialty_en, resClinic_vi, resClinic_en} = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty_vi = this.buildDataInputSelect(resSpecialty_vi, 'SPECIALTY_VI');
            let dataSelectClinic_vi = this.buildDataInputSelect(resClinic_vi, 'CLINIC_VI');
            let dataSelectSpecialty_en = this.buildDataInputSelect(resSpecialty_en, 'SPECIALTY_EN');
            let dataSelectClinic_en = this.buildDataInputSelect(resClinic_en, 'CLINIC_EN');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty_vi: dataSelectSpecialty_vi,
                listClinic_vi: dataSelectClinic_vi,
                listSpecialty_en: dataSelectSpecialty_en,
                listClinic_en: dataSelectClinic_en
            })
        } 

        if(prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState ({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length>0 ? arrGenders[0].keyMap : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState ({
                positionArr: arrPositions,
                positionId: arrPositions && arrPositions.length>0 ? arrPositions[0].keyMap : ''
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    handleEditorChange_en = ({ html, text }) => {
        this.setState({
            contentMarkdown_en: text,
            contentHTML_en: html,
        });
    }

    handleSaveContentMarkdown = () => {
        let {haveData} = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            contentHTML_en: this.state.contentHTML_en,
            contentMarkdown_en: this.state.contentMarkdown_en,
            description_en: this.state.description_en,
            doctorId: this.props.userInfo.id,
            action: haveData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedClinic: this.state.selectedClinic.value,
            nameClinic: this.state.selectedClinic.label,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : ''
        })
    }

    handleChangeSelect = async () => {
        let {listPrice, listPayment, listProvince, listSpecialty_vi, listSpecialty_en, listClinic_vi, listClinic_en} = this.state;
        let res = await getDetailDoctor(this.props.userInfo.id);
        if(res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown_En) {
            let markdown = res.data.Markdown;
            let markdown_en = res.data.Markdown_En;
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '',
                selectedPrice = '', selectedPayment = '', selectedProvince = '',
                specialtyId = '', clinicId = '',
                selectedSpecialty = '', selectedClinic = '';

            if(res.data.Doctor_Info) {
                addressClinic = res.data.Doctor_Info.addressClinic;
                nameClinic = res.data.Doctor_Info.nameClinic;
                note = res.data.Doctor_Info.note;
                paymentId = res.data.Doctor_Info.paymentId;
                priceId = res.data.Doctor_Info.priceId;
                provinceId = res.data.Doctor_Info.provinceId;
                specialtyId = res.data.Doctor_Info.specialtyId;
                clinicId = res.data.Doctor_Info.clinicId;

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                if(this.props.language === LANGUAGES.VI) {
                    selectedSpecialty = listSpecialty_vi.find(item => {
                        return item && item.value === specialtyId
                    })
                    selectedClinic = listClinic_vi.find(item => {
                        return item && item.value === clinicId
                    })
                } else {
                    selectedSpecialty = listSpecialty_en.find(item => {
                        return item && item.value === specialtyId
                    })
                    selectedClinic = listClinic_en.find(item => {
                        return item && item.value === clinicId
                    })
                }
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                contentHTML_en: markdown_en.contentHTML,
                contentMarkdown_en: markdown_en.contentMarkdown,
                description_en: markdown_en.description,
                haveData: true,
                addressClinic: addressClinic,
                nameClinic: (selectedClinic && selectedClinic.label) ? selectedClinic.label : '',
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty:selectedSpecialty,
                selectedClinic: selectedClinic 
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                contentHTML_en: '',
                contentMarkdown_en: '',
                description_en: '',
                haveData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                paymentId: '',
                priceId: '',
                provinceId: '',
                specialtyId: '',
                clinicId: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty:'',
                selectedClinic: '' 
            })
        }
    };

    handleChangeSelectDoctorInfo = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
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

    handleEditDoctor = async () => {
        try {
            let res = await editUserService(this.state)
            if(res && res.errCode === 0) {

                toast.success("Cập nhật thông tin thành công!");
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage);
            }
        } catch (error) {
            toast.error("Cập nhật thông tin thất bại!");
            console.log(error)
        }
    }

    render() {
        let {haveData, listSpecialty_vi: listSpecialty} = this.state;
        let {userInfo, language} = this.props;
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        return (
            <div className='container doctor-container'>
                <div className='title mb-4'><FormattedMessage id = "doctor-manage.doctor-title"/></div>

                <div className='row my-4 doctor-details'>
                    <div className='col-2'>
                        <input className=' my-4 avatar ml-3' type='file'
                            style={{backgroundImage: `url(${this.state.image})`}}
                            onChange={(event)=>{this.handleOnChangeImg(event, "image")}}    
                        >
                        </input>
                        {/* <input className='col-10 file' type='file'
                            onChange={(event)=>{this.handleOnChangeImg(event, "image")}}
                        ></input> */}

                    </div>
                    <div className='row col-10 more-infoo mt-4 ml-2'>
                        <div className='form-group col-4'>
                            <label><FormattedMessage id = "doctor-manage.firstname"/>:</label>
                            <input className='form-control'
                                value={this.state.firstName}
                                onChange={(event)=>{this.onChangeInput(event, "firstName")}}
                            />
                        </div>
                        <div className='form-group col-4'>
                            <label><FormattedMessage id = "doctor-manage.lastname"/>:</label>
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
                            <label><FormattedMessage id = "doctor-manage.phone"/>:</label>
                            <input className='form-control'
                                value={this.state.phonenumber}
                                onChange={(event)=>{this.onChangeInput(event, "phonenumber")}}
                            />
                        </div>
                        <div className='form-group col-4'>
                            <label><FormattedMessage id = "doctor-manage.gender"/>:</label>
                            <select 
                                className='form-control gender'
                                onChange={(event)=>{this.onChangeInput(event, "gender")}}
                            >
                                <option selected disabled hidden>{language === LANGUAGES.VI ? this.state.doctorGender.valueVi : this.state.doctorGender.valueEn}</option>
                                {genders && genders.length>0 && genders.map((item, index) => {
                                    return (
                                        <option selected={false} key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='form-group col-4'>
                            <label><FormattedMessage id = "doctor-manage.position"/>:</label>
                            <select 
                                className='form-control positions'
                                onChange={(event)=>{this.onChangeInput(event, "positionId")}}
                            >
                                <option selected disabled hidden>{language === LANGUAGES.VI ? this.state.doctorPosition.valueVi : this.state.doctorPosition.valueEn}</option>
                                {positions && positions.length>0 && positions.map((item, index) => {
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
                            onClick={() => this.handleEditDoctor()}
                        >
                            <FormattedMessage id = "doctor-manage.edit"/> 
                        </button>
                    </div>
                </div>

                <div className='row markdown-editor my-4'>
                    <div className='col-12 mt-4 more-info more-btn'>
                        <div className='form-group'>
                            <button
                            className='detail-button'
                                onClick={this.handleChangeSelect}
                            >
                                <FormattedMessage id = "doctor-manage.more-btn"/>
                            </button>
                        </div>
                    </div>

                    <div className='col-12 mt-2 more-info'>
                        {/* <div className='content-left form-group fullname'>
                            <label><FormattedMessage id = "doctor-manage.full-name"/>:</label>
                            <input className='form-control'
                                onChange={(event)=>this.handleOnChangeText(event, 'name')}
                                value={`${userInfo.firstName} ${userInfo.lastName}`}
                            />
                        </div> */}
                        <div className='content-right form-group col-6'>
                            <label><FormattedMessage id = "doctor-manage.introduction-title"/> (vi):</label>
                            <textarea 
                                className='form-control' 
                                // rows = "3"
                                onChange={(event)=>this.handleOnChangeText(event, 'description')}
                                value={this.state.description}
                            ></textarea>
                        </div>
                        <div className='content-right form-group col-6'>
                            <label><FormattedMessage id = "doctor-manage.introduction-title"/> (en):</label>
                            <textarea 
                                className='form-control' 
                                // rows = "3"
                                onChange={(event)=>this.handleOnChangeText(event, 'description_en')}
                                value={this.state.description_en}
                            ></textarea>
                        </div>
                    </div>
                    <div className='col-12 mt-2 detail_info'>
                        <div className=' form-group price col-4'>
                            <label><FormattedMessage id = "doctor-manage.choose-price"/>:</label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-price"/>}
                                name='selectedPrice'
                            />
                        </div>
                        <div className=' form-group payment col-4'>
                            <label><FormattedMessage id = "doctor-manage.choose-payment"/>:</label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-payment"/>}
                                name='selectedPayment'
                            />
                        </div>
                        <div className=' form-group province col-4'>
                            <label><FormattedMessage id = "doctor-manage.choose-province"/>:</label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-province"/>}
                                name='selectedProvince'
                            />
                        </div>
                        {/* <div className=' form-group name'>
                            <label><FormattedMessage id = "doctor-manage.clinic-name"/>:</label>
                            <input className='form-control'
                                onChange={(event)=>this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div> */}
                        <div className=' form-group specialty col-4'>
                            <label><FormattedMessage id = "doctor-manage.choose-specialty"/>:</label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={language === LANGUAGES.VI ? this.state.listSpecialty_vi : this.state.listSpecialty_en}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-specialty"/>}
                                name='selectedSpecialty'
                            />
                        </div>
                        <div className=' form-group clinic col-4'>
                            <label><FormattedMessage id = "doctor-manage.choose-clinic"/>:</label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={language === LANGUAGES.VI ? this.state.listClinic_vi : this.state.listClinic_en}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-clinic"/>}
                                name='selectedClinic'
                            />
                        </div>
                        <div className=' form-group address col-4'>
                            <label><FormattedMessage id = "doctor-manage.clinic-address"/>:</label>
                            <input className='form-control'
                                onChange={(event)=>this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className=' form-group note col-12'>
                            <label><FormattedMessage id = "doctor-manage.note"/>:</label>
                            <input className='form-control'
                                onChange={(event)=>this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            />
                        </div>
                    </div>
                    <div className='markdown col-12 mb-4'>
                        <label><FormattedMessage id = "doctor-manage.description"/> (vi):</label>
                        <MdEditor 
                            style={{ height: '200px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} 
                        />
                    </div>
                    <div className='markdown col-12 mb-4'>
                        <label><FormattedMessage id = "doctor-manage.description"/> (en):</label>
                        <MdEditor 
                            style={{ height: '200px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange_en}
                            value={this.state.contentMarkdown_en} 
                        />
                    </div>
                    <div className='save-btn col-12 mb-4'>
                        <button 
                            className='btn btn-primary'
                            onClick={() => this.handleSaveContentMarkdown()}
                        >
                            <FormattedMessage id = "doctor-manage.save-btn"/> 
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
        userInfo: state.user.userInfo,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalManage);
