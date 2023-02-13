import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES, CommonUtils} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ClinicManage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { createClinic, getAllClinic, editClinic, deleteClinic, getTrashClinic, unDeleteClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
import ModalEditClinic from './ModalEditClinic';
import ModalDeleteClinic from './ModalDeleteClinic';
import ModalUnDeleteClinic from './ModalUnDeleteClinic';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name_vi: '',
            address_vi: '',
            imageBase64: '',
            descriptionHTML_vi: '',
            descriptionMarkdown_vi: '',
            dataClinic_vi: [],
            name_en: '',
            address_en: '',
            descriptionHTML_en: '',
            descriptionMarkdown_en: '',
            dataClinic_en: [],
            clinicEdit: {},
            clinicDelete: {},
            isOpenEdit: false,
            isOpenDelete: false,

            dataTrash_vi: [],
            dataTrash_en: [],
            isOpenUnDelete: false,
            clinicUnDelete: {},
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if(res && res.errCode === 0) {
            this.setState({
                dataClinic_vi: res.data_vi ? res.data_vi : [],
                dataClinic_en: res.data_en ? res.data_en : []

            })
        }

        let trash = await getTrashClinic();
        if(trash && trash.errCode === 0) {
            this.setState({
                dataTrash_vi: trash.data_vi ? trash.data_vi : [],
                dataTrash_en: trash.data_en ? trash.data_en : []

            })
        }
    }

    
    async componentDidUpdate(prevProps, prevState, snapshot) {

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

    handleSaveClinic = async () => {
        let res = await createClinic(this.state);
        if(res && res.errCode === 0) {
            this.setState({
                name_vi: '',
                address_vi: '',
                imageBase64: '',
                descriptionHTML_vi: '',
                descriptionMarkdown_vi: '',
                name_en: '',
                address_en: '',
                descriptionHTML_en: '',
                descriptionMarkdown_en: '',
            })
            toast.success("Create clinic for success!");
            this.componentDidMount();
        } else {
            toast.error(res.errMessage)
            console.log('Error:', res)
        }
    }

    toggleEditModal = () => {
        this.setState({
            isOpenEdit: !this.state.isOpenEdit,
        })
    }
    
    handleEditClinic = (clinic) => {
        this.setState({
            isOpenEdit: true,
            clinicEdit: clinic
        })
    }

    doEditClinic = async (clinic) => {
        try {
            let res = await editClinic(clinic)
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenEdit: false,
                })
                toast.success("Update clinic for success!");
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage);
            }
        } catch (error) {
            toast.error("Update clinic for failed!");
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

    handleDeleteClinic = (clinic) => {
        this.setState({
            isOpenDelete: true,
            clinicDelete: clinic
        })
    }

    handleUnDeleteClinic = (clinic) => {
        this.setState({
            isOpenUnDelete: true,
            clinicUnDelete: clinic
        })
    }

    doDeleteClinic = async (clinic) => {
        try {
            let res = await deleteClinic(this.state.clinicDelete);
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenDelete: false,
                })
                toast.success("Delete clinic for success!");
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage)
            }
        } catch (error) {
            toast.error("Delete clinic for failed!");
            console.log('Error:', error)
        }
    }

    unDeleteClinic = async (clinic) => {
        try {
            let res = await unDeleteClinic(this.state.clinicUnDelete);
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenUnDelete: false,
                })
                toast.success("Restore clinic for success!");
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage)
            }
        } catch (error) {
            toast.error("Restore clinic for failed!");
            console.log('Error:', error)
        }
    }

    render() {
        let {dataClinic_vi, dataClinic_en, dataTrash_vi, dataTrash_en} = this.state;
        return (
            <div className='clinic-manage-container container'>
                {
                    this.state.isOpenEdit &&
                    <ModalEditClinic
                        isOpen = {this.state.isOpenEdit}
                        toggleFromParent = {this.toggleEditModal}
                        currentClinic = {this.state.clinicEdit}
                        editClinicModal = {this.doEditClinic} 
                    />
                }
                {
                    this.state.isOpenDelete &&
                    <ModalDeleteClinic
                        isOpen = {this.state.isOpenDelete}
                        toggleFromParent = {this.toggleDeleteModal}
                        currentClinic = {this.state.clinicDelete}
                        deleteClinicModal = {this.doDeleteClinic} 
                    />
                }
                {
                    this.state.isOpenUnDelete &&
                    <ModalUnDeleteClinic
                        isOpen = {this.state.isOpenUnDelete}
                        toggleFromParent = {this.toggleUnDeleteModal}
                        currentClinic = {this.state.clinicUnDelete}
                        unDeleteClinicModal = {this.unDeleteClinic} 
                    />
                }
                <div className='title'><FormattedMessage id="clinic-manage.title"/></div>
                <div className='row add-clinic'> 
                    <div className='add-title col-12 '>-- <FormattedMessage id="clinic-manage.add-title"/> --</div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="clinic-manage.name"/> (vi):</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name_vi}
                            onChange={(event)=>this.handleOnChangeInput(event, 'name_vi')}
                        ></input>
                    </div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="clinic-manage.name"/> (en):</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name_en}
                            onChange={(event)=>this.handleOnChangeInput(event, 'name_en')}
                        ></input>
                    </div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="clinic-manage.address"/> (vi):</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.address_vi}
                            onChange={(event)=>this.handleOnChangeInput(event, 'address_vi')}
                        ></input>
                    </div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="clinic-manage.address"/> (en):</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.address_en}
                            onChange={(event)=>this.handleOnChangeInput(event, 'address_en')}
                        ></input>
                    </div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="clinic-manage.image"/>:</label>
                        <input 
                            className='form-control-file' 
                            type='file' 
                            style={{ backgroundColor: 'white', width: '100%', marginTop: '4px' }}
                            onChange={(event) => this.handleOnChangeImg(event)}
                        ></input>
                    </div>
                    <div className='col-12'>
                    <label><FormattedMessage id="clinic-manage.description"/> (vi):</label>
                        <MdEditor 
                            style={{ height: '200px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange_vi}
                            value={this.state.descriptionMarkdown_vi} 
                        />
                    </div>
                    <div className='col-12 mt-4'>
                    <label><FormattedMessage id="clinic-manage.description"/> (en):</label>
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
                            onClick={()=>this.handleSaveClinic()}
                        ><FormattedMessage id="clinic-manage.save-btn"/></button>
                    </div>
                </div>

                <div className='nav-list container px-0'>
                    <ul className="nav nav-pills mt-4" id="pills-tab" role="tablist">
                        <li className="nav-item nav-item-1">
                            <a className="nav-link link-1 active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                <i className="fas fa-list"></i>
                                <FormattedMessage id = "clinic-manage.list-title"/>
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
                            <div className='row my-4 list-clinic'>
                                {/* <div className='table-title col-12 mb-2'>-- <FormattedMessage id="clinic-manage.list-title"/> --</div> */}
                                <div className='col-12 px-0'>
                                    <table id="table-clinic" className='col-12'>
                                        {this.props.language === LANGUAGES.VI ?
                                            <tbody>
                                                <tr>
                                                    <th style={{width: '10%'}}><FormattedMessage id="clinic-manage.picture"/></th>
                                                    <th style={{width: '25%'}}><FormattedMessage id="clinic-manage.name"/></th>
                                                    <th style={{width: '55%'}}><FormattedMessage id="clinic-manage.address"/></th>
                                                    <th style={{width: '5%'}}><FormattedMessage id="clinic-manage.edit"/></th>
                                                    <th style={{width: '5%'}}><FormattedMessage id="clinic-manage.delete"/></th>
                                                </tr>
                                                {dataClinic_vi && dataClinic_vi.length>0 && 
                                                    dataClinic_vi.map((item, index) => {
                                                        return(
                                                            <tr key={index}>
                                                                <td>
                                                                    <div 
                                                                        className='background-img img-clinic'
                                                                        style={{backgroundImage: `url(${item.image})`}}
                                                                    >
                                                                    </div>
                                                                </td>
                                                                <td style={{textAlign: 'center', fontWeight: '600'}}>{item.name}</td>
                                                                <td style={{textAlign: 'center', fontWeight: '500'}}>{item.address}</td>
                                                                <td className='edit text-center'>
                                                                    <button 
                                                                        className='edit-btn' 
                                                                        onClick={()=>this.handleEditClinic(item.id)}
                                                                    >
                                                                        <i className="fas fa-pencil-alt"></i>
                                                                    </button>
                                                                </td>
                                                                <td className='delete text-center'>
                                                                    <button 
                                                                        className='delete-btn'
                                                                        onClick={()=>this.handleDeleteClinic(item.id)} 
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
                                                    <th style={{width: '10%'}}><FormattedMessage id="clinic-manage.picture"/></th>
                                                    <th style={{width: '25%'}}><FormattedMessage id="clinic-manage.name"/></th>
                                                    <th style={{width: '55%'}}><FormattedMessage id="clinic-manage.address"/></th>
                                                    <th style={{width: '5%'}}><FormattedMessage id="clinic-manage.edit"/></th>
                                                    <th style={{width: '5%'}}><FormattedMessage id="clinic-manage.delete"/></th>
                                                </tr>
                                                {dataClinic_en && dataClinic_en.length>0 && 
                                                    dataClinic_en.map((item, index) => {
                                                        return(
                                                            <tr key={index}>
                                                                <td>
                                                                    <div 
                                                                        className='background-img img-clinic'
                                                                        style={{backgroundImage: `url(${item.image_en})`}}
                                                                    >
                                                                    </div>
                                                                </td>
                                                                <td style={{textAlign: 'center', fontWeight: '600'}}>{item.name_en}</td>
                                                                <td style={{textAlign: 'center', fontWeight: '500'}}>{item.address_en}</td>
                                                                <td className='edit text-center'>
                                                                    <button 
                                                                        className='edit-btn' 
                                                                        onClick={()=>this.handleEditClinic(item.id_en)}
                                                                    >
                                                                        <i className="fas fa-pencil-alt"></i>
                                                                    </button>
                                                                </td>
                                                                <td className='delete text-center'>
                                                                    <button 
                                                                        className='delete-btn'
                                                                        onClick={()=>this.handleDeleteClinic(item.id_en)} 
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
                            <div className='row my-4 list-clinic'>
                                {/* <div className='table-title col-12 mb-2'>-- <FormattedMessage id="clinic-manage.list-title"/> --</div> */}
                                <div className='col-12 px-0'>
                                    <table id="table-clinic" className='col-12'>
                                        {this.props.language === LANGUAGES.VI ?
                                            <tbody>
                                                <tr>
                                                    <th style={{width: '10%'}}><FormattedMessage id="clinic-manage.picture"/></th>
                                                    <th style={{width: '25%'}}><FormattedMessage id="clinic-manage.name"/></th>
                                                    <th style={{width: '50%'}}><FormattedMessage id="clinic-manage.address"/></th>
                                                    <th style={{width: '7.5%'}}><FormattedMessage id="clinic-manage.edit"/></th>
                                                    <th style={{width: '7.5%'}}><FormattedMessage id="clinic-manage.restore"/></th>
                                                </tr>
                                                {dataTrash_vi && dataTrash_vi.length>0 && 
                                                    dataTrash_vi.map((item, index) => {
                                                        return(
                                                            <tr key={index}>
                                                                <td>
                                                                    <div 
                                                                        className='background-img img-clinic'
                                                                        style={{backgroundImage: `url(${item.image})`}}
                                                                    >
                                                                    </div>
                                                                </td>
                                                                <td style={{textAlign: 'center', fontWeight: '600'}}>{item.name}</td>
                                                                <td style={{textAlign: 'center', fontWeight: '500'}}>{item.address}</td>
                                                                <td className='edit text-center'>
                                                                    <button 
                                                                        className='edit-btn' 
                                                                        onClick={()=>this.handleEditClinic(item.id)}
                                                                    >
                                                                        <i className="fas fa-pencil-alt"></i>
                                                                    </button>
                                                                </td>
                                                                <td className='delete text-center'>
                                                                    <button 
                                                                        className='restore-btn'
                                                                        onClick={()=>this.handleUnDeleteClinic(item.id)} 
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
                                                    <th style={{width: '10%'}}><FormattedMessage id="clinic-manage.picture"/></th>
                                                    <th style={{width: '25%'}}><FormattedMessage id="clinic-manage.name"/></th>
                                                    <th style={{width: '50%'}}><FormattedMessage id="clinic-manage.address"/></th>
                                                    <th style={{width: '7.5%'}}><FormattedMessage id="clinic-manage.edit"/></th>
                                                    <th style={{width: '7.5%'}}><FormattedMessage id="clinic-manage.restore"/></th>
                                                </tr>
                                                {dataTrash_en && dataTrash_en.length>0 && 
                                                    dataTrash_en.map((item, index) => {
                                                        return(
                                                            <tr key={index}>
                                                                <td>
                                                                    <div 
                                                                        className='background-img img-clinic'
                                                                        style={{backgroundImage: `url(${item.image_en})`}}
                                                                    >
                                                                    </div>
                                                                </td>
                                                                <td style={{textAlign: 'center', fontWeight: '600'}}>{item.name_en}</td>
                                                                <td style={{textAlign: 'center', fontWeight: '500'}}>{item.address_en}</td>
                                                                <td className='edit text-center'>
                                                                    <button 
                                                                        className='edit-btn' 
                                                                        onClick={()=>this.handleEditClinic(item.id_en)}
                                                                    >
                                                                        <i className="fas fa-pencil-alt"></i>
                                                                    </button>
                                                                </td>
                                                                <td className='delete text-center'>
                                                                    <button 
                                                                        className='restore-btn'
                                                                        onClick={()=>this.handleUnDeleteClinic(item.id_en)} 
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
