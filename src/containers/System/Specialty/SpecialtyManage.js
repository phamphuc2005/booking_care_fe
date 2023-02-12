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
import { createSpecialty, getAllSpecialty, editSpecialty, deleteSpecialty, getTrashSpecialty, unDeleteSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import ModalEditSpecialty from './ModalEditSpecialty';
import ModalDeleteSpecialty from './ModalDeleteSpecialty';
import ModalUnDeleteSpecialty from './ModalUnDeleteSpecialty';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class SpecialtyManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name_vi: '',
            imageBase64: '',
            descriptionHTML_vi: '',
            descriptionMarkdown_vi: '',
            dataSpecialty_vi: [],
            name_en: '',
            descriptionHTML_en: '',
            descriptionMarkdown_en: '',
            dataSpecialty_en: [],
            specialtyEdit: {},
            specialtyDelete: {},
            isOpenEdit: false,
            isOpenDelete: false,

            dataTrash_vi: [],
            dataTrash_en: [],
            isOpenUnDelete: false,
            specialtyUnDelete: {},

        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if(res && res.errCode === 0) {
            this.setState({
                dataSpecialty_vi: res.data_vi ? res.data_vi : [],
                dataSpecialty_en: res.data_en ? res.data_en : []
            })
        }

        let trash = await getTrashSpecialty();
        if(trash && trash.errCode === 0) {
            this.setState({
                dataTrash_vi: trash.data_vi ? trash.data_vi : [],
                dataTrash_en: trash.data_en ? trash.data_en : []
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
        // this.componentDidMount();
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

    handleEditorChange_vi = ({ html, text }) => {
        this.setState({
            descriptionMarkdown_vi: text,
            descriptionHTML_vi: html,
        });
    }
    handleEditorChange_en = ({ html, text }) => {
        this.setState({
            descriptionMarkdown_en: text,
            descriptionHTML_en: html,
        });
    }

    handleSaveSpecialty = async () => {
        let res = await createSpecialty(this.state);
        if(res && res.errCode === 0) {
            this.setState({
                name_vi: '',
                imageBase64: '',
                descriptionHTML_vi: '',
                descriptionMarkdown_vi: '',
                name_en: '',
                descriptionHTML_en: '',
                descriptionMarkdown_en: '',
            })
            toast.success("Create specialty for success!");
            this.componentDidMount();
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
                this.componentDidMount();
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

    toggleUnDeleteModal = () => {
        this.setState({
            isOpenUnDelete: !this.state.isOpenUnDelete,
        })
    }

    handleDeleteSpecialty = (specialty) => {
        this.setState({
            isOpenDelete: true,
            specialtyDelete: specialty
        })
    }

    handleUnDeleteSpecialty = (specialty) => {
        this.setState({
            isOpenUnDelete: true,
            specialtyUnDelete: specialty
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
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage)
            }
        } catch (error) {
            toast.error("Delete specialty for failed!");
            console.log('Error:', error)
        }
    }

    unDeleteSpecialty = async (specialty) => {
        try {
            let res = await unDeleteSpecialty(specialty.id);
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenUnDelete: false,
                })
                toast.success("Restore specialty for success!");
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage)
            }
        } catch (error) {
            toast.error("Restore specialty for failed!");
            console.log('Error:', error)
        }
    }

    render() {
        let {dataSpecialty_vi, dataSpecialty_en, dataTrash_vi, dataTrash_en} = this.state;
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
                {
                    this.state.isOpenUnDelete &&
                    <ModalUnDeleteSpecialty
                        isOpen = {this.state.isOpenUnDelete}
                        toggleFromParent = {this.toggleUnDeleteModal}
                        currentSpecialty = {this.state.specialtyUnDelete}
                        unDeleteSpecialtyModal = {this.unDeleteSpecialty} 
                    />
                }
                <div className='title'><FormattedMessage id="specialty-manage.title"/></div>
                <div className='row add-specialty'> 
                    <div className='add-title col-12 '>-- <FormattedMessage id="specialty-manage.add-title"/> --</div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="specialty-manage.name"/> (vi):</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name_vi}
                            onChange={(event)=>this.handleOnChangeInput(event, 'name_vi')}
                        ></input>
                    </div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="specialty-manage.name"/> (en):</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name_en}
                            onChange={(event)=>this.handleOnChangeInput(event, 'name_en')}
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
                    <div className='col-12 mt-3'>
                        <label><FormattedMessage id="specialty-manage.description"/> (vi):</label>
                        <MdEditor 
                            style={{ height: '200px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange_vi}
                            value={this.state.descriptionMarkdown_vi} 
                        />
                    </div>
                    <div className='col-12 mt-3'>
                        <label><FormattedMessage id="specialty-manage.description"/> (en):</label>
                        <MdEditor 
                            style={{ height: '200px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange_en}
                            value={this.state.descriptionMarkdown_en} 
                        />
                    </div>
                    <div className='col-12 my-4'>
                        <button 
                            className='btn btn-primary'
                            onClick={()=>this.handleSaveSpecialty()}
                        ><FormattedMessage id="specialty-manage.save-btn"/></button>
                    </div>
                </div>
                
                <div className='nav-list container px-0'>
                    <ul className="nav nav-pills mt-4" id="pills-tab" role="tablist">
                        <li className="nav-item nav-item-1">
                            <a className="nav-link link-1 active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                <i className="fas fa-list"></i>
                                <FormattedMessage id="specialty-manage.list-title"/>
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
                            <div className='row my-4 list-specialty'>
                                {/* <div className='table-title col-12 mb-2'>-- <FormattedMessage id="specialty-manage.list-title"/> --</div> */}
                                <div className='col-12 px-0'>
                                    <table id="table-specialty" className='col-12'>
                                        {this.props.language === LANGUAGES.VI ?
                                            <tbody>
                                                <tr>
                                                    <th style={{width: '10%'}}><FormattedMessage id="specialty-manage.picture"/></th>
                                                    <th style={{width: '50%'}}><FormattedMessage id="specialty-manage.name"/></th>
                                                    <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.edit"/></th>
                                                    <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.delete"/></th>
                                                </tr>
                                                {dataSpecialty_vi && dataSpecialty_vi.length>0 && 
                                                    dataSpecialty_vi.map((item, index) => {
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
                                                                        onClick={()=>this.handleEditSpecialty(item.id)}
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

                                            </tbody> :                 
                                            <tbody>
                                                <tr>
                                                    <th style={{width: '10%'}}><FormattedMessage id="specialty-manage.picture"/></th>
                                                    <th style={{width: '50%'}}><FormattedMessage id="specialty-manage.name"/></th>
                                                    <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.edit"/></th>
                                                    <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.delete"/></th>
                                                </tr>
                                                {dataSpecialty_en && dataSpecialty_en.length>0 && 
                                                    dataSpecialty_en.map((item, index) => {
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
                                                                        onClick={()=>this.handleEditSpecialty(item.id)}
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
                                        }
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className='row my-4 list-specialty'>
                                {/* <div className='table-title col-12 mb-2'>-- <FormattedMessage id="specialty-manage.list-title"/> --</div> */}
                                <div className='col-12 px-0'>
                                    <table id="table-specialty" className='col-12'>
                                        {this.props.language === LANGUAGES.VI ?
                                            <tbody>
                                                <tr>
                                                    <th style={{width: '10%'}}><FormattedMessage id="specialty-manage.picture"/></th>
                                                    <th style={{width: '50%'}}><FormattedMessage id="specialty-manage.name"/></th>
                                                    <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.edit"/></th>
                                                    <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.restore"/></th>
                                                </tr>
                                                {dataTrash_vi && dataTrash_vi.length>0 && 
                                                    dataTrash_vi.map((item, index) => {
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
                                                                        onClick={()=>this.handleEditSpecialty(item.id)}
                                                                    >
                                                                        <i className="fas fa-pencil-alt"></i>
                                                                    </button>
                                                                </td>
                                                                <td className='delete text-center'>
                                                                    <button 
                                                                        className='restore-btn'
                                                                        onClick={()=>this.handleUnDeleteSpecialty(item)} 
                                                                    >
                                                                        <i className="fas fa-undo"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody> :                 
                                            <tbody>
                                                <tr>
                                                    <th style={{width: '10%'}}><FormattedMessage id="specialty-manage.picture"/></th>
                                                    <th style={{width: '50%'}}><FormattedMessage id="specialty-manage.name"/></th>
                                                    <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.edit"/></th>
                                                    <th style={{width: '20%'}}><FormattedMessage id="specialty-manage.restore"/></th>
                                                </tr>
                                                {dataTrash_en && dataTrash_en.length>0 && 
                                                    dataTrash_en.map((item, index) => {
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
                                                                        onClick={()=>this.handleEditSpecialty(item.id)}
                                                                    >
                                                                        <i className="fas fa-pencil-alt"></i>
                                                                    </button>
                                                                </td>
                                                                <td className='delete text-center'>
                                                                    <button 
                                                                        className='restore-btn'
                                                                        onClick={()=>this.handleUnDeleteSpecialty(item)} 
                                                                    >
                                                                        <i className="fas fa-undo"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        }
                                    </table>

                                </div>
                            </div>
                        </div>
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
