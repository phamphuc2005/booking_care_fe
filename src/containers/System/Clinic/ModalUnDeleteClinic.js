import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';

class ModalUnDeleteClinic extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
        }
    }

    componentDidMount() {
        let clinic = this.props.currentClinic;
        if (clinic && !_.isEmpty(clinic)) {
            this.setState({
                id: clinic.id,
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


    handleUnDeleteClinic = () => {
        this.props.unDeleteClinicModal(this.state);
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}}
                className={'modal-clinic-container'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "clinic-modal.restore-title"/></ModalHeader>
                <ModalBody>
                    <div><FormattedMessage id = "clinic-modal.restore-content"/></div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary px-3" 
                        onClick={()=>{this.handleUnDeleteClinic()}}
                    ><FormattedMessage id = "clinic-modal.restore-btn"/></Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUnDeleteClinic);




