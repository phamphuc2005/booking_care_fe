import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES, CommonUtils} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './SpecialtyManage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { createSpecialty, getAllSpecialty, editSpecialty, deleteSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import ModalEditSpecialty from './ModalEditSpecialty';
import ModalDeleteSpecialty from './ModalDeleteSpecialty';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class SpecialtyManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            dataSpecialty: [],
            specialtyEdit: {},
            specialtyDelete: {},
            isOpenEdit: false,
            isOpenDelete: false,
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if(res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
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
        this.componentDidMount();
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    }

    handleSaveSpecialty = async () => {
        let res = await createSpecialty(this.state);
        if(res && res.errCode === 0) {
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
            toast.success("Create specialty for success!");
        } else {
            toast.error(res.errMessage)
            console.log('Error:', res)
        }
        console.log(this.state)
    }

    toggleEditModal = () => {
        this.setState({
            isOpenEdit: !this.state.isOpenEdit,
        })
    }
    
    handleEditSpecialty = (specialty) => {
        this.setState({
            isOpenEdit: true,
            specialtyEdit: specialty
        })
    }

    doEditSpecialty = async (specialty) => {
        try {
            let res = await editSpecialty(specialty)
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenEdit: false,
                })
                toast.success("Update specialty for success!");
                await getAllSpecialty();
            } else {
                toast.warn(res.errMessage);
            }
        } catch (error) {
            toast.error("Update specialty for failed!");
            console.log(error)
        }
    }

    toggleDeleteModal = () => {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete,
        })
    }

    handleDeleteSpecialty = (specialty) => {
        this.setState({
            isOpenDelete: true,
            specialtyDelete: specialty
        })
    }

    doDeleteSpecialty = async (specialty) => {
        try {
            let res = await deleteSpecialty(specialty.id);
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenDelete: false,
                })
                toast.success("Delete specialty for success!");
                await getAllSpecialty();
            } else {
                toast.warn(res.errMessage)
            }
        } catch (error) {
            toast.error("Delete specialty for failed!");
            console.log('Error:', error)
        }
    }

    render() {
        let {dataSpecialty} = this.state;
        return (
            <div className='specialty-manage-container container'>
                {
                    this.state.isOpenEdit &&
                    <ModalEditSpecialty
                        isOpen = {this.state.isOpenEdit}
                        toggleFromParent = {this.toggleEditModal}
                        currentSpecialty = {this.state.specialtyEdit}
                        editSpecialtyModal = {this.doEditSpecialty} 
                    />
                }
                {
                    this.state.isOpenDelete &&
                    <ModalDeleteSpecialty
                        isOpen = {this.state.isOpenDelete}
                        toggleFromParent = {this.toggleDeleteModal}
                        currentSpecialty = {this.state.specialtyDelete}
                        deleteSpecialtyModal = {this.doDeleteSpecialty} 
                    />
                }
                <div className='title'><FormattedMessage id="specialty-manage.title"/></div>
                <div className='row add-specialty'> 
                    <div className='add-title col-12 '>-- <FormattedMessage id="specialty-manage.add-title"/> --</div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="specialty-manage.name"/>:</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name}
                            onChange={(event)=>this.handleOnChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="specialty-manage.image"/>:</label>
                        <input 
                            className='form-control-file' 
                            type='file' 
                            style={{ backgroundColor: 'white', width: '100%', marginTop: '4px' }}
                            onChange={(event) => this.handleOnChangeImg(event)}
                        ></input>
                    </div>
                    <div className='col-12'>
                        <MdEditor 
                            style={{ height: '400px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown} 
                        />
                    </div>
                    <div className='col-12 my-4'>
                        <button 
                            className='btn btn-primary'
                            onClick={()=>this.handleSaveSpecialty()}
                        ><FormattedMessage id="specialty-manage.save-btn"/></button>
                    </div>
                </div>
                <div className='row my-4 list-specialty'>
                    <div className='table-title col-12 mb-2'>-- <FormattedMessage id="specialty-manage.list-title"/> --</div>
                    <div className='col-12'>
                        <table id="table-specialty" className='col-12'>
                            <tbody>
                                <tr>
                                    <th style={{width: '10%'}}><FormattedMessage id="specialty-manage.picture"/></th>
                                    <th style={{width: '50%'}}><FormattedMessage id="specialty-manage.name"/></th>
                                    <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.edit"/></th>
                                    <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.delete"/></th>
                                </tr>
                                {dataSpecialty && dataSpecialty.length>0 && 
                                    dataSpecialty.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>
                                                    <div 
                                                        className='background-img img-specialty'
                                                        style={{backgroundImage: `url(${item.image})`}}
                                                    >
                                                    </div>
                                                </td>
                                                <td style={{textAlign: 'center', fontWeight: '600'}}>{item.name}</td>
                                                <td className='edit text-center'>
                                                    <button 
                                                        className='edit-btn' 
                                                        onClick={()=>this.handleEditSpecialty(item)}
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                </td>
                                                <td className='delete text-center'>
                                                    <button 
                                                        className='delete-btn'
                                                        onClick={()=>this.handleDeleteSpecialty(item)} 
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>                 
                        </table>

                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
