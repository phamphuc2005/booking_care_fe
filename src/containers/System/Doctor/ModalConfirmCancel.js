import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';

class ModalConfirmCancel extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
        }
    }

    componentDidMount() {
        let appointment = this.props.currentAppointment;
        if (appointment && !_.isEmpty(appointment)) {
            this.setState({
                id: appointment.id,
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


    handleConfirmCancel = () => {
        this.props.confirmCancelModal(this.state);
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}}
                className={'modal-cancel-container'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "patient-manage.modal-cancel-title"/></ModalHeader>
                <ModalBody>
                    <div><FormattedMessage id = "patient-manage.modal-cancel-content"/></div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="danger px-3" 
                        onClick={()=>{this.handleConfirmCancel()}}
                    ><FormattedMessage id = "patient-manage.yes"/></Button>{' '}
                    <Button color="secondary px-3" onClick={()=>{this.toggle()}}><FormattedMessage id = "patient-manage.no"/></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmCancel);




