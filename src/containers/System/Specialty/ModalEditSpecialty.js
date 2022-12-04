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

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalEditSpecialty extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    componentDidMount() {
        let specialty = this.props.currentSpecialty;
        if (specialty && !_.isEmpty(specialty)) {
            this.setState({
                id : specialty.id,
                name: specialty.name,
                imageBase64: specialty.imageBase64,
                descriptionHTML: specialty.descriptionHTML,
                descriptionMarkdown: specialty.descriptionMarkdown,
            })
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

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name', 'imageBase64', 'descriptionHTML', 'descriptionMarkdown'];
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
                        <div className='input-container'>
                            <label><FormattedMessage id = "specialty-modal.name"/>:</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "name")}}
                                value={this.state.name}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id = "specialty-modal.image"/>:</label>
                            <input 
                                className='form-control-file'
                                type='file' 
                                onChange={(event)=>{this.handleOnChangeImg(event, "imageBase64")}}
                                value={this.state.image}
                            />
                        </div>
                        <div className='col-12'>
                            <MdEditor 
                                style={{ height: '300px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown} 
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




