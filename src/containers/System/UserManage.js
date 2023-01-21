import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import {emitter} from '../../utils/emitter';
import HomeFooter from '../HomePage/HomeFooter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpen: false,
            isOpenEdit: false,
            isOpenDelete: false,
            userEdit: {},
            userDelete: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpen: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenEdit: !this.state.isOpenEdit,
        })
    }

    toggleDeleteUserModal = () => {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState ({
                    isOpen: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }          
        } catch (error) {
            console.log (error)
        }
    }

    handleDeleteUser = (user) => {
        this.setState({
            isOpenDelete: true,
            userDelete: user
        })
    }

    deleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenDelete: false,
                })
                await this.getAllUsersFromReact();
            } else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenEdit: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user)
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenEdit: false,
                })
                await this.getAllUsersFromReact();
            } else {
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            // <div className="users-container">
            //     <ModalUser
            //         isOpen = {this.state.isOpen}
            //         toggleFromParent = {this.toggleUserModal}
            //         createNewUser = {this.createNewUser}
            //     />
            //     {
            //         this.state.isOpenEdit &&
            //         <ModalEditUser
            //             isOpen = {this.state.isOpenEdit}
            //             toggleFromParent = {this.toggleEditUserModal}
            //             currentUser = {this.state.userEdit}
            //             editUser = {this.doEditUser} 
            //         />
            //     }
            //     {
            //         this.state.isOpenDelete &&
            //         <ModalDeleteUser
            //             isOpen = {this.state.isOpenDelete}
            //             toggleFromParent = {this.toggleDeleteUserModal}
            //             currentUser = {this.state.userDelete}
            //             deleteUser = {this.deleteUser} 
            //         />
            //     }
            //     <div className='title text-center'><FormattedMessage id = "usermanage.title"/></div>
            //     <div className='mx-4'>
            //         <button 
            //         className='btn btn-primary px-2'
            //         onClick={()=>this.handleAddNewUser()}>
            //         <i className="fas fa-plus"></i>
            //             <FormattedMessage id = "usermanage.add-btn"/>
            //         </button>
            //     </div>
            //     <div className='users-table mt-4 mx-4'>
            //         <table id="customers">
            //             <tbody>
            //                 <tr>
            //                     <th>Email</th>
            //                     <th><FormattedMessage id = "usermanage.firstname"/></th>
            //                     <th><FormattedMessage id = "usermanage.lastname"/></th>
            //                     <th><FormattedMessage id = "usermanage.address"/></th>
            //                     <th><FormattedMessage id = "usermanage.phone"/></th>
            //                     <th><FormattedMessage id = "usermanage.action"/></th>
            //                 </tr>
                            
            //                 {
            //                     arrUsers && arrUsers.map((item, index) => {
            //                         return(
            //                             <tr>
            //                                 <td>{item.email}</td>
            //                                 <td>{item.firstName}</td>
            //                                 <td>{item.lastName}</td>
            //                                 <td>{item.address}</td>
            //                                 <td>{item.phonenumber}</td>
            //                                 <td className='text-center'>
            //                                     <button className='btn-edit' onClick={()=>this.handleEditUser(item)}>
            //                                         <i className="fas fa-pencil-alt"></i>
            //                                     </button>
            //                                     <button className='btn-delete' onClick={()=>this.handleDeleteUser(item)}>
            //                                         <i className="fas fa-trash-alt"></i>
            //                                     </button>
            //                                 </td>
            //                             </tr>
            //                         )
            //                     })
            //                 }
            //             </tbody>                 
            //         </table>
            //     </div>
            // </div>
            <>
                <div className='container home-page'>
                    <div className='row'>
                        <div className='col-12 home-page-body'>
                            <div className='title1'><FormattedMessage id = "usermanage.title1"/></div>   
                            <i className="fas fa-user-cog"></i>
                            <div className='title2'><FormattedMessage id = "usermanage.title2"/></div>   
                        </div>
                        
                    </div>
                </div>
                <HomeFooter/>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
