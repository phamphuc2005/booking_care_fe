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
import { getAllSpecialty, getDetailSpecialtyById } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalEditSpecialty extends Component {

    constructor(props){
        super(props);
        this.state = {
            name_vi: '',
            imageBase64: '',
            descriptionHTML_vi: '',
            descriptionMarkdown_vi: '',
            name_en: '',
            descriptionHTML_en: '',
            descriptionMarkdown_en: '',
        }
    }

    // componentDidMount() {
    //     let specialty = this.props.currentSpecialty;
    //     if (specialty && !_.isEmpty(specialty)) {
    //         this.setState({
    //             id : specialty.id,
    //             name: specialty.name,
    //             imageBase64: specialty.imageBase64,
    //             descriptionHTML: specialty.descriptionHTML,
    //             descriptionMarkdown: specialty.descriptionMarkdown,
    //         })
    //     }
    // }

    async componentDidMount() {
        let specialty = this.props.currentSpecialty;
        if (specialty) {
            let res = await getDetailSpecialtyById({
                id: specialty,
            });

            if(res && res.errCode === 0 ){
                this.setState({
                    id : specialty,
                    imageBase64: res.data_vi.image,
                    name_vi: res.data_vi.name,
                    descriptionHTML_vi: res.data_vi.descriptionHTML,
                    descriptionMarkdown_vi: res.data_vi.descriptionMarkdown,
                    name_en: res.data_en.name,
                    descriptionHTML_en: res.data_en.descriptionHTML,
                    descriptionMarkdown_en: res.data_en.descriptionMarkdown,
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
        let arrInput = ['name_vi', 'imageBase64', 'descriptionHTML_vi', 'descriptionMarkdown_vi',
        'name_en', 'descriptionHTML_en', 'descriptionMarkdown_en'];
        for(let i=0; i<arrInput.length; i++) {
            if(!this.state[arrInput[i]]) {
                isValid = false;
                toast.warn('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveSpecialty = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true) {
            this.props.editSpecialtyModal(this.state);
            console.log(this.state)
        }
    }

    render() {
        console.log('---------',this.state);
        return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}}
                className={'modal-specialty-container'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "specialty-modal.edit-title"/></ModalHeader>
                <ModalBody>
                    <div className='modal-specialty-body'>
                        <div className='input-container col-12'>
                            <label><FormattedMessage id = "specialty-modal.image"/>:</label>
                            <input 
                                className='form-control-file images'
                                type='file' 
                                onChange={(event)=>{this.handleOnChangeImg(event, "imageBase64")}}
                                style={{backgroundImage: `url(${this.state.imageBase64})`}}
                            />
                        </div>
                        <div className='input-container col-6 mt-3'>
                            <label><FormattedMessage id = "specialty-modal.name"/> (vi):</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "name_vi")}}
                                value={this.state.name_vi}
                            />
                        </div>
                        <div className='input-container col-6 mt-3'>
                            <label><FormattedMessage id = "specialty-modal.name"/> (en):</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "name_en")}}
                                value={this.state.name_en}
                            />
                        </div>
                        <div className='col-12 mt-3'>
                            <label><FormattedMessage id="specialty-manage.description"/> (vi):</label>
                            <MdEditor 
                                style={{ height: '180px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleEditorChange_vi}
                                value={this.state.descriptionMarkdown_vi} 
                            />
                        </div>
                        <div className='col-12 mt-3'>
                            <label><FormattedMessage id="specialty-manage.description"/> (en):</label>
                            <MdEditor 
                                style={{ height: '180px' }} 
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
                        onClick={()=>{this.handleSaveSpecialty()}}
                    ><FormattedMessage id = "specialty-modal.save-btn"/></Button>{' '}
                    <Button color="secondary px-3" onClick={()=>{this.toggle()}}><FormattedMessage id = "specialty-modal.cancel-btn"/></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditSpecialty);




