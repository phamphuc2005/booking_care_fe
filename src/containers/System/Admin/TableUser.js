import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableUser.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}


class TableUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
            isOpen: false,
            deleteUserId: ''
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listUser !== this.props.listUser) {
            this.setState ({
                userRedux: this.props.listUser
            })
        }
    }

    handleDeleteUser = (user) => {
        // this.props.deleteUserRedux(user.id);
        this.setState({
            isOpen: true,
            deleteUserId: user.id
        })
    }
    
    handleEditUser = (user) => {
        this.props.handleEditUserRedux(user)
    }

    toggleDeleteModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    handleDeleteUserModal = () => {
        this.props.deleteUserRedux(this.state.deleteUserId);
        this.setState({
            isOpen: false,
        })
    }

    render() {
        let arrUsers = this.state.userRedux;
        return (
            <>
                <div className='container mb-5'>
                    <div className='row list-user'>
                        <div className='table-title col-12 mb-4'>-- <FormattedMessage id = "user-manage.table-title"/> --</div>
                        <div className=' col-12'>
                            <table id="table-user">
                                <tbody>
                                    <tr>
                                        <th>Email</th>
                                        <th><FormattedMessage id = "usermanage.firstname"/></th>
                                        <th><FormattedMessage id = "usermanage.lastname"/></th>
                                        <th><FormattedMessage id = "usermanage.address"/></th>
                                        <th><FormattedMessage id = "usermanage.phone"/></th>
                                        <th><FormattedMessage id = "usermanage.action"/></th>
                                    </tr>
                                    
                                    {arrUsers && arrUsers.length>0 && 
                                        arrUsers.map((item, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{item.email}</td>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.phonenumber}</td>
                                                    <td className='text-center'>
                                                        <button 
                                                            className='btn-edit' 
                                                            onClick={()=>this.handleEditUser(item)}
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
                                                        <button 
                                                            className='btn-delete'
                                                            onClick={()=>this.handleDeleteUser(item)} 
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>                 
                            </table>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.isOpen}
                    toggle={()=>this.toggleDeleteModal()}
                    className={'modal-user-container'}
                    size="lg"
                >
                    <ModalHeader toggle={()=>this.toggleDeleteModal()}><FormattedMessage id = "user-modal.delete-title"/></ModalHeader>
                    <ModalBody>
                        <div><FormattedMessage id = "user-modal.delete-content"/></div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="danger px-3" 
                            onClick={()=>{this.handleDeleteUserModal()}}
                        ><FormattedMessage id = "user-modal.delete-btn"/></Button>{' '}
                        <Button color="secondary px-3" onClick={()=>this.toggleDeleteModal()}><FormattedMessage id = "user-modal.cancel-btn"/></Button>
                    </ModalFooter>
                </Modal>
            </>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
