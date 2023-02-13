import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TrashUser.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getTrashUsers, unDeleteUser } from '../../../services/userService';
import { toast } from 'react-toastify';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class TrashUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
            isOpen: false,
            unDeleteId: '',
            dataTrash: []
        }
    }

    async componentDidMount() {
        this.props.fetchUserRedux();
        let res = await getTrashUsers();
        if(res && res.errCode === 0) {
            this.setState({
                dataTrash: res.data ? res.data : [],
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listUser !== this.props.listUser) {
            this.setState ({
                userRedux: this.props.listUser
            })
        }
    }

    handleUnDeleteUser = (user) => {
        this.setState({
            isOpen: true,
            unDeleteId: user.id
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

    handleDeleteUserModal = async () => {
        try {
            let res = await unDeleteUser(this.state.unDeleteId);
            if(res && res.errCode === 0) {
                this.setState({
                    isOpen: false,
                })
                toast.success("Khôi phục người dùng thành công!");
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage)
            }
        } catch (error) {
            toast.error("Khôi phục người dùng thất bại!");
            console.log('Error:', error)
        }
    }

    render() {
        let arrUsers = this.state.userRedux;
        let arrTrash = this.state.dataTrash;
        return (
            <>
                <div className='container mb-5'>
                    <div className='row trash-user'>
                        {/* <div className='table-title col-12 mb-4'>-- <FormattedMessage id = "user-manage.table-title"/> --</div> */}
                        <div className=' col-12 trash-table'>
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
                                    
                                    {arrTrash && arrTrash.length>0 && 
                                        arrTrash.map((item, index) => {
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
                                                            className='btn-delete undelete'
                                                            onClick={()=>this.handleUnDeleteUser(item)} 
                                                        >
                                                            <i className="fas fa-undo"></i>
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
                    <ModalHeader toggle={()=>this.toggleDeleteModal()}><FormattedMessage id = "user-modal.restore-title"/></ModalHeader>
                    <ModalBody>
                        <div><FormattedMessage id = "user-modal.undelete-content"/></div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="primary px-3" 
                            onClick={()=>{this.handleDeleteUserModal()}}
                        ><FormattedMessage id = "user-modal.restore-btn"/></Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(TrashUser);
