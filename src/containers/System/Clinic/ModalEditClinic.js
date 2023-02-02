import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
import { CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';
import { getDetailClinicById } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalEditClinic extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name_vi: '',
            address_vi: '',
            imageBase64: '',
            descriptionHTML_vi: '',
            descriptionMarkdown_vi: '',
            name_en: '',
            address_en: '',
            descriptionHTML_en: '',
            descriptionMarkdown_en: '',
            dataDetailClinic_vi: {},
            dataDetailClinic_en: {},
        }
    }

    async componentDidMount() {
        let clinic = this.props.currentClinic;
        console.log('cl:', clinic);
        if (clinic) {
            // this.setState({
            //     id : this.props.currentClinic,
            //     name_vi: clinic.name_vi,
            //     address_vi: clinic.address_vi,
            //     imageBase64: clinic.imageBase64,
            //     descriptionHTML_vi: clinic.descriptionHTML_vi,
            //     descriptionMarkdown_vi: clinic.descriptionMarkdown_vi,
            //     name_en: clinic.name_en,
            //     address_en: clinic.address_en,
            //     descriptionHTML_en: clinic.descriptionHTML_en,
            //     descriptionMarkdown_en: clinic.descriptionMarkdown_en,
            // })
            let res = await getDetailClinicById({
                id: clinic,
            });

            if(res && res.errCode === 0 ){
                this.setState({
                    id: clinic,
                    // dataDetailClinic_vi: res.data_vi,
                    // dataDetailClinic_en: res.data_en,
                    imageBase64: res.data_vi.image,
                    name_vi: res.data_vi.name,
                    address_vi: res.data_vi.address,
                    descriptionHTML_vi: res.data_vi.descriptionHTML,
                    descriptionMarkdown_vi: res.data_vi.descriptionMarkdown,
                    name_en: res.data_en.name_en,
                    address_en: res.data_en.address_en,
                    descriptionHTML_en: res.data_en.descriptionHTML_en,
                    descriptionMarkdown_en: res.data_en.descriptionMarkdown_en,
                })
            }
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (event, id) => {
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
                imageBase64: base64
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

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name_vi', 'address_vi', 'imageBase64', 'descriptionHTML_vi', 'descriptionMarkdown_vi',
        'name_en', 'address_en', 'descriptionHTML_en', 'descriptionMarkdown_en'];
        for(let i=0; i<arrInput.length; i++) {
            if(!this.state[arrInput[i]]) {
                isValid = false;
                toast.warn('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveClinic = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true) {
            this.props.editClinicModal(this.state);
            console.log(this.state)
        }
    }

    render() {
        console.log('ress:', this.state);
        return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}}
                className={'modal-clinic-container'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "clinic-modal.edit-title"/></ModalHeader>
                <ModalBody>
                    <div className='modal-clinic-body'>
                        <div className='input-container'>
                            <label><FormattedMessage id = "clinic-modal.name"/> (vi):</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "name_vi")}}
                                value={this.state.name_vi}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id = "clinic-modal.name"/> (en):</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "name_en")}}
                                value={this.state.name_en}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id = "clinic-modal.address"/> (vi):</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "address_vi")}}
                                value={this.state.address_vi}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id = "clinic-modal.address"/> (en):</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "address_en")}}
                                value={this.state.address_en}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id = "clinic-modal.image"/>:</label>
                            <input 
                                className='form-control-file images'
                                type='file' 
                                onChange={(event)=>{this.handleOnChangeImg(event, "imageBase64")}}
                                style={{backgroundImage: `url(${this.state.imageBase64})`}}
                            />
                        </div>
                        <div className='col-12'>
                            <label><FormattedMessage id="clinic-manage.description"/> (vi):</label>
                            <MdEditor 
                                style={{ height: '150px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleEditorChange_vi}
                                value={this.state.descriptionMarkdown_vi} 
                            />
                        </div>
                        <div className='col-12'>
                            <label><FormattedMessage id="clinic-manage.description"/> (en):</label>
                            <MdEditor 
                                style={{ height: '150px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleEditorChange_en}
                                value={this.state.descriptionMarkdown_en} 
                            />
                        </div>
                    </div>   

                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary px-3" 
                        onClick={()=>{this.handleSaveClinic()}}
                    ><FormattedMessage id = "clinic-modal.save-btn"/></Button>{' '}
                    <Button color="secondary px-3" onClick={()=>{this.toggle()}}><FormattedMessage id = "clinic-modal.cancel-btn"/></Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditClinic);




