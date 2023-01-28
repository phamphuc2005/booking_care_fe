import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';

class ModalDeleteComment extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
        }
    }

    componentDidMount() {
        let comment = this.props.currentComment;
        if (comment && !_.isEmpty(comment)) {
            this.setState({
                id: comment.id,
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleDeleteComment = () => {
        this.props.deleteCommentModal(this.state);
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}}
                className={'modal-comment-container modal-dialog-centered'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "comment.delete-title"/></ModalHeader>
                <ModalBody>
                    <div><FormattedMessage id = "comment.delete-content"/></div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="danger px-3" 
                        onClick={()=>{this.handleDeleteComment()}}
                    ><FormattedMessage id = "comment.delete"/></Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteComment);




