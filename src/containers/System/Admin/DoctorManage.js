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
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            haveData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],
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
            if(type === 'SPECIALTY') {
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let {resPrice, resPayment, resProvince, resSpecialty} = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty
            })
        }
        if(prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo){
            let {resPrice, resPayment, resProvince, resSpecialty} = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            console.log(dataSelectPrice, dataSelectPayment, dataSelectProvince, dataSelectSpecialty)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    handleSaveContentMarkdown = () => {
        let {haveData} = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: haveData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : ''
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let {listPrice, listPayment, listProvince, listSpecialty, listClinic} = this.state;
        let res = await getDetailDoctor(selectedDoctor.value);
        if(res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
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
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                haveData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
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
        console.log(`Option selected:`, res)
    };

    handleChangeSelectDoctorInfo = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy
        })
        console.log('hahihu:', selectedDoctor, stateName)
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let {haveData, listSpecialty} = this.state;
        console.log('hello', this.state)
        return (
            <div className='container doctor-container'>
                <div className='title mb-4'><FormattedMessage id = "doctor-manage.title"/></div>
                <div className='row markdown-editor my-4'>
                    <div className='col-12 mt-4 more-info'>
                        <div className='content-left form-group'>
                            <label><FormattedMessage id = "doctor-manage.choose-title"/>:</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-title"/>}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label><FormattedMessage id = "doctor-manage.introduction-title"/>:</label>
                            <textarea 
                                className='form-control' 
                                // rows = "3"
                                onChange={(event)=>this.handleOnChangeText(event, 'description')}
                                value={this.state.description}
                            ></textarea>
                        </div>
                    </div>
                    <div className='col-12 mt-2 detail-info'>
                        <div className=' form-group price'>
                            <label><FormattedMessage id = "doctor-manage.choose-price"/>:</label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-price"/>}
                                name='selectedPrice'
                            />
                        </div>
                        <div className=' form-group payment'>
                            <label><FormattedMessage id = "doctor-manage.choose-payment"/>:</label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-payment"/>}
                                name='selectedPayment'
                            />
                        </div>
                        <div className=' form-group province'>
                            <label><FormattedMessage id = "doctor-manage.choose-province"/>:</label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-province"/>}
                                name='selectedProvince'
                            />
                        </div>
                        <div className=' form-group name'>
                            <label><FormattedMessage id = "doctor-manage.clinic-name"/>:</label>
                            <input className='form-control'
                                onChange={(event)=>this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className=' form-group address'>
                            <label><FormattedMessage id = "doctor-manage.clinic-address"/>:</label>
                            <input className='form-control'
                                onChange={(event)=>this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className=' form-group note'>
                            <label><FormattedMessage id = "doctor-manage.note"/>:</label>
                            <input className='form-control'
                                onChange={(event)=>this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            />
                        </div>
                        <div className=' form-group specialty'>
                            <label><FormattedMessage id = "doctor-manage.choose-specialty"/>:</label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listSpecialty}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-specialty"/>}
                                name='selectedSpecialty'
                            />
                        </div>
                        <div className=' form-group clinic'>
                            <label><FormattedMessage id = "doctor-manage.choose-clinic"/>:</label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listClinic}
                                placeholder={<FormattedMessage id = "doctor-manage.choose-clinic"/>}
                                name='selectedClinic'
                            />
                        </div>
                    </div>
                    <div className='col-12 my-4'>
                        <MdEditor 
                            style={{ height: '400px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} 
                        />
                    </div>
                    <div className='col-12 mb-4'>
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
