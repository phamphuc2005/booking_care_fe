import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';

class ModalDeleteUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
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


    handleDeleteUser = () => {
        this.props.deleteUser(this.state);
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                toggle={()=>{this.toggle()}}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Delete user</ModalHeader>
                <ModalBody>
                    <div>Are you sure you want to delete?</div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="danger px-3" 
                        onClick={()=>{this.handleDeleteUser()}}
                    >Delete</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteUser);




