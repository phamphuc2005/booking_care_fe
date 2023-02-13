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
import moment from 'moment';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalEditComment extends Component {

    constructor(props){
        super(props);
        this.state = {
            content: '',
            date: moment(new Date()).startOf('day').valueOf(),
        }
    }

    componentDidMount() {
        let comment = this.props.currentComment;
        if (comment && !_.isEmpty(comment)) {
            this.setState({
                id : comment.id,
                content: comment.content,
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

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['content'];
        for(let i=0; i<arrInput.length; i++) {
            if(!this.state[arrInput[i]]) {
                isValid = false;
                toast.warn('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveComment = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true) {
            this.props.editCommentModal(this.state);
        }
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}}
                className={'modal-comment-container modal-dialog-centered'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "comment.edit-title"/></ModalHeader>
                <ModalBody>
                    <div className='modal-comment-body'>
                        <div className='input-container'>
                            <textarea 
                                onChange={(event)=>{this.handleOnChangeInput(event, "content")}}
                                value={this.state.content}
                            />
                        </div>
                    </div>   

                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary px-3" 
                        onClick={()=>{this.handleSaveComment()}}
                    ><FormattedMessage id = "comment.edit"/></Button>{' '}
                    <Button color="secondary px-3" onClick={()=>{this.toggle()}}><FormattedMessage id = "comment.cancel-btn"/></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditComment);




