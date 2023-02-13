import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DoctorManage.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import {CRUD_ACTIONS, LANGUAGES} from '../../../utils';
import {getDetailDoctor} from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            contentMarkdown_en: '',
            contentHTML_en: '',
            selectedDoctor: '',
            description: '',
            description_en: '',
            listDoctors: [],
            haveData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty_vi: [],
            listClinic_vi: [],
            listSpecialty_en: [],
            listClinic_en: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            specialtyId: '',
            clinicId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfo();
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
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
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
            doctorId: this.state.selectedDoctor.value,
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

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let {listPrice, listPayment, listProvince, listSpecialty_vi, listSpecialty_en, listClinic_vi, listClinic_en} = this.state;
        let res = await getDetailDoctor(selectedDoctor.value);
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
                // nameClinic = res.data.Doctor_Info.nameClinic;
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
                if(this.props.language === LANGUAGES.VI){
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

    render() {
        let {haveData, listSpecialty_vi} = this.state;
        return (
            <div className='container doctor-container'>
                <div className='title mb-4'><FormattedMessage id = "doctor-manage.title"/></div>
                <div className='row markdown-editor my-4'>
                    <div className='col-12 mt-4 more-infos'>
                        <div className='content-left form-group col-3'>
                            <label><FormattedMessage id = "doctor-manage.choose-title"/>:</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-title"/>}
                            />
                        </div>
                        <div className='content-right note form-group col-9'>
                            <label><FormattedMessage id = "doctor-manage.note"/>:</label>
                            <input className='form-control'
                                onChange={(event)=>this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            />
                        </div>
                    </div>
                    <div className='col-12 mt-2 detail-infos'>
                        <div className='form-group col-6'>
                            <label><FormattedMessage id = "doctor-manage.introduction-title"/> (vi):</label>
                            <textarea 
                                className='form-control' 
                                // rows = "3"
                                onChange={(event)=>this.handleOnChangeText(event, 'description')}
                                value={this.state.description}
                            ></textarea>
                        </div>
                        <div className='form-group col-6'>
                            <label><FormattedMessage id = "doctor-manage.introduction-title"/> (en):</label>
                            <textarea 
                                className='form-control' 
                                // rows = "3"
                                onChange={(event)=>this.handleOnChangeText(event, 'description_en')}
                                value={this.state.description_en}
                            ></textarea>
                        </div>
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
                                options={this.props.language === LANGUAGES.VI ? this.state.listSpecialty_vi : this.state.listSpecialty_en}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-specialty"/>}
                                name='selectedSpecialty'
                            />
                        </div>
                        <div className=' form-group clinic col-4'>
                            <label><FormattedMessage id = "doctor-manage.choose-clinic"/>:</label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.props.language === LANGUAGES.VI ? this.state.listClinic_vi : this.state.listClinic_en}
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
                    </div>
                    <div className='markdown col-12  mb-4'>
                        <label className=''><FormattedMessage id = "doctor-manage.description"/> (vi):</label>
                        <MdEditor 
                            style={{ height: '200px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} 
                        />
                    </div>
                    <div className='markdown col-12  mb-4'>
                        <label className=''><FormattedMessage id = "doctor-manage.description"/> (en):</label>
                        <MdEditor 
                            style={{ height: '200px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange_en}
                            value={this.state.contentMarkdown_en} 
                        />
                    </div>
                    <div className='save-btn col-12 mb-4 px-4'>
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
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
