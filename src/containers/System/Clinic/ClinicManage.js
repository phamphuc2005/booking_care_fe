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
import { createClinic, getAllClinic, editClinic, deleteClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
import ModalEditClinic from './ModalEditClinic';
import ModalDeleteClinic from './ModalDeleteClinic';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            dataClinic: [],
            clinicEdit: {},
            clinicDelete: {},
            isOpenEdit: false,
            isOpenDelete: false,
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if(res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
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

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    }

    handleSaveClinic = async () => {
        let res = await createClinic(this.state);
        if(res && res.errCode === 0) {
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
            toast.success("Create clinic for success!");
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

    handleDeleteClinic = (clinic) => {
        this.setState({
            isOpenDelete: true,
            clinicDelete: clinic
        })
    }

    doDeleteClinic = async (clinic) => {
        try {
            let res = await deleteClinic(clinic.id);
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

    render() {
        let {dataClinic} = this.state;
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
                <div className='title'><FormattedMessage id="clinic-manage.title"/></div>
                <div className='row add-clinic'> 
                    <div className='add-title col-12 '>-- <FormattedMessage id="clinic-manage.add-title"/> --</div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="clinic-manage.name"/>:</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name}
                            onChange={(event)=>this.handleOnChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="clinic-manage.address"/>:</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.address}
                            onChange={(event)=>this.handleOnChangeInput(event, 'address')}
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
                            onClick={()=>this.handleSaveClinic()}
                        ><FormattedMessage id="clinic-manage.save-btn"/></button>
                    </div>
                </div>
                <div className='row my-4 list-clinic'>
                    <div className='table-title col-12 mb-2'>-- <FormattedMessage id="clinic-manage.list-title"/> --</div>
                    <div className='col-12'>
                        <table id="table-clinic" className='col-12'>
                            <tbody>
                                <tr>
                                    <th style={{width: '10%'}}><FormattedMessage id="clinic-manage.picture"/></th>
                                    <th style={{width: '25%'}}><FormattedMessage id="clinic-manage.name"/></th>
                                    <th style={{width: '55%'}}><FormattedMessage id="clinic-manage.address"/></th>
                                    <th style={{width: '5%'}}><FormattedMessage id="clinic-manage.edit"/></th>
                                    <th style={{width: '5%'}}><FormattedMessage id="clinic-manage.delete"/></th>
                                </tr>
                                {dataClinic && dataClinic.length>0 && 
                                    dataClinic.map((item, index) => {
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
                                                        onClick={()=>this.handleEditClinic(item)}
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                </td>
                                                <td className='delete text-center'>
                                                    <button 
                                                        className='delete-btn'
                                                        onClick={()=>this.handleDeleteClinic(item)} 
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
