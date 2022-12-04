import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';

class ModalDeleteSpecialty extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
        }
    }

    componentDidMount() {
        let specialty = this.props.currentSpecialty;
        if (specialty && !_.isEmpty(specialty)) {
            this.setState({
                id: specialty.id,
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


    handleDeleteSpecialty = () => {
        this.props.deleteSpecialtyModal(this.state);
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}}
                className={'modal-specialty-container'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "specialty-modal.delete-title"/></ModalHeader>
                <ModalBody>
                    <div><FormattedMessage id = "specialty-modal.delete-content"/></div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="danger px-3" 
                        onClick={()=>{this.handleDeleteSpecialty()}}
                    ><FormattedMessage id = "specialty-modal.delete-btn"/></Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteSpecialty);




