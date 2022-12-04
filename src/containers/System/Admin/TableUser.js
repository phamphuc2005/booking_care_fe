import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableUser.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

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
            userRedux: []
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
        this.props.deleteUserRedux(user.id);
    }
    
    handleEditUser = (user) => {
        this.props.handleEditUserRedux(user)
    }

    render() {
        let arrUsers = this.state.userRedux;
        return (
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
