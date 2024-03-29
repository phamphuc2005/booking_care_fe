import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
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

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber'];
        for(let i=0; i<arrInput.length; i++) {
            if(!this.state[arrInput[i]]) {
                isValid = false;
                alert('Thiếu dữ liệu: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}><FormattedMessage id = "user-modal.edit-title"/></ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email:</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id = "user-modal.password"/>:</label>
                            <input 
                                type='password' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "password")}}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id = "user-modal.firstname"/>:</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "firstName")}}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id = "user-modal.lastname"/>:</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "lastName")}}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id = "user-modal.address"/>:</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "address")}}
                                value={this.state.address}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id = "user-modal.phone"/>:</label>
                            <input 
                                type='number' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "phonenumber")}}
                                value={this.state.phonenumber}
                            />
                        </div>
                    </div>   

                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary px-3" 
                        onClick={()=>{this.handleSaveUser()}}
                    ><FormattedMessage id = "user-modal.save-btn"/></Button>{' '}
                    <Button color="secondary px-3" onClick={()=>{this.toggle()}}><FormattedMessage id = "user-modal.cancel-btn"/></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




