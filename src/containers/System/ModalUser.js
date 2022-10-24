import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', ()=> {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '',
                roleId: '',
            })
        })
    }

    componentDidMount() {
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
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId'];
        for(let i=0; i<arrInput.length; i++) {
            if(!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true) {
            this.props.createNewUser(this.state);
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
                <ModalHeader toggle={()=>{this.toggle()}}>Create new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email:</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password:</label>
                            <input 
                                type='password' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "password")}}
                                value={this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Firstname:</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "firstName")}}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Lastname:</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "lastName")}}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Address:</label>
                            <input 
                                type='text' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "address")}}
                                value={this.state.address}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Phonenumber:</label>
                            <input 
                                type='number' 
                                onChange={(event)=>{this.handleOnChangeInput(event, "phonenumber")}}
                                value={this.state.phonenumber}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Gender:</label>
                            <select 
                                name="gender" 
                                onChange={(event)=>{this.handleOnChangeInput(event, "gender")}}
                                value={this.state.gender}>
                                <option value="">-- Choose option --</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <FormGroup className='input-container'>
                            <label>Role:</label>
                            <select
                                name="roleId" 
                                onChange={(event)=>{this.handleOnChangeInput(event, "roleId")}}
                                value={this.state.roleId}>
                                <option value="">-- Choose option --</option>
                                <option value="0">Admin</option>
                                <option value="1">Doctor</option>
                                <option value="2">Patient</option>
                            </select>
                        </FormGroup>
                    </div>   

                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary px-3" 
                        onClick={()=>{this.handleAddNewUser()}}
                    >Add</Button>{' '}
                    <Button color="secondary px-3" onClick={()=>{this.toggle()}}>Cancel</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




