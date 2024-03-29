import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES} from '../../../utils';
import './Comment.scss';
import {createComment, getAllComment, editComment, deleteComment, getUserInfo} from '../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import ModalEditComment from './ModalEditComment';
import ModalDeleteComment from './ModalDeleteComment';
import { FormattedMessage } from 'react-intl';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            userId: '',
            doctorId: +this.props.doctorID,
            clinicId: '',
            date: '',
            arrComments: [],
            commentEdit: {},
            isOpenEdit: false,
            commentDelete: {},
            isOpenDelete: false,
            order: 'ASC',
            image: ''
        }
    }

    initFacebookSDK() {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        let { language } = this.props;
        let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US'
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.5' // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    async componentDidMount() {
        // this.initFacebookSDK();
        if(this.props.doctorID) {
            let comments = await getAllComment({
                id: this.props.doctorID,
                order: this.state.order
            });
                if(comments && comments.errCode === 0) {
                this.setState({
                    arrComments: comments.data
                })
            }
        }
        await this.getUser();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    getUser = async () => {
        if(this.props.isLoggedIn === true) {
            let response = await getUserInfo({id: this.props.userInfo.id});
            if(response && response.errCode === 0) {
                this.setState({
                    image: response.data.image
                })
            }
        }
    }

    handleOnChangeText = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    handlePostComment = async () => {
        this.setState({
            userId: this.props.userInfo.id,
            doctorId: +this.props.doctorID,
            content: this.state.content,
            date: moment(new Date()).startOf('day').valueOf(),
        })
        setTimeout(async function(){
            let res = await createComment(this.state);
            if(res && res.errCode === 0) {
                this.componentDidMount();
            } else if (res && res.errCode === 2) {
                toast.warn(res.errMessage)
            } else {
                toast.error(res.errMessage)
            }
            this.setState({
                userId: '',
                doctorId: '',
                content: '',
                date: '',
            })
        }.bind(this), 1000);
        
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    toggleEditModal = () => {
        this.setState({
            isOpenEdit: !this.state.isOpenEdit,
        })
    }
    
    handleEditComment = (comment) => {
        this.setState({
            isOpenEdit: true,
            commentEdit: comment
        })
    }

    doEditComment = async (comment) => {
        try {
            let res = await editComment(comment)
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenEdit: false,
                })
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage);
            }
        } catch (error) {
            toast.error("Chỉnh sửa bình luận thất bại!");
            console.log(error)
        }
    }

    toggleDeleteModal = () => {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete,
        })
    }

    handleDeleteComment = (comment) => {
        this.setState({
            isOpenDelete: true,
            commentDelete: comment
        })
    }

    doDeleteComment = async (comment) => {
        try {
            let res = await deleteComment(comment.id);
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenDelete: false,
                })
                this.componentDidMount();
            } else {
                toast.warn(res.errMessage)
            }
        } catch (error) {
            toast.error("Xóa bình luận thất bại!");
            console.log('Error:', error)
        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        setTimeout(async function(){
            this.componentDidMount();
        }.bind(this), 100);
    }

    render() {
        let {dataHref, width, numPost, language} = this.props;
        let isLoggedIn = this.props.isLoggedIn;
        let {arrComments} = this.state;
        let write = language === LANGUAGES.VI ? 'Viết bình luận ...' : 'Write comment ...'
        let old = language === LANGUAGES.VI ? 'Cũ nhất' : 'Oldest';
        let news = language === LANGUAGES.VI ? 'Mới nhất' : 'Newest';
        
        return (
            <React.Fragment>
                 {/* <div class="fb-comments" 
                    data-href="https://developers.facebook.com/docs/plugins/"
                    data-width={width ? width : ""}
                    data-numposts={numPost ? numPost : 1}>
                 </div> */}
                 {
                    this.state.isOpenEdit &&
                    <ModalEditComment
                        isOpen = {this.state.isOpenEdit}
                        toggleFromParent = {this.toggleEditModal}
                        currentComment = {this.state.commentEdit}
                        editCommentModal = {this.doEditComment} 
                    />
                }
                {
                    this.state.isOpenDelete &&
                    <ModalDeleteComment
                        isOpen = {this.state.isOpenDelete}
                        toggleFromParent = {this.toggleDeleteModal}
                        currentComment = {this.state.commentDelete}
                        deleteCommentModal = {this.doDeleteComment} 
                    />
                }
                 <div>
                    <div className='comment-header'>
                        <div className='number-title'>{arrComments.length} <FormattedMessage id = "comment.title"/></div>
                        <select
                            className='form-control'
                            name="order" 
                            onChange={(event)=>{this.handleOnChangeInput(event, "order")}}
                            value={this.state.order}>
                            <option value="ASC">{old}</option>
                            <option value="DESC">{news}</option>
                        </select>
                    </div>
                    <div className='comment-up'>
                        {isLoggedIn ? 
                            <>
                                {this.state.image ?
                                    <div className='user-avatar'
                                        style={{backgroundImage: `url(${new Buffer(this.state.image, 'base64').toString('binary')})`}}
                                    ></div> : 
                                    <div className='user-avatar'
                                        style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnmqNl25_iCHNWRwqjgYDZlZtgh2LPB1NZJxkS5IMAkh5m5xxRNV_--WHa_cVbUR0wKg&usqp=CAU)`}}
                                    ></div>
                                }
                            </> : ''
                        }
                        <div className='user-comment'>
                            {isLoggedIn ?
                                <textarea className='input-comment'
                                    placeholder = {write}
                                    onChange={(event)=>this.handleOnChangeText(event)}
                                    value={this.state.content}
                                ></textarea> : 
                                <textarea disabled className='input-comment'
                                    placeholder={write}
                                    onChange={(event)=>this.handleOnChangeText(event)}
                                    value={this.state.content}
                                ></textarea>
                            }
                            {isLoggedIn ?
                                <button className='btn-primary' onClick={()=>this.handlePostComment()}>
                                    <FormattedMessage id = "comment.post"/>
                                </button> : 
                                <div className='note'><FormattedMessage id = "comment.note"/></div>
                            }
                        </div>
                    </div>
                    {arrComments && arrComments.length>0 && arrComments.map((item, index) => {
                        let date = language === LANGUAGES.VI ? 
                        this.capitalizeFirstLetter(moment.unix(+item.date / 1000).format('DD/MM/YYYY')) : 
                        moment.unix(+item.date / 1000).locale('en').format('MM/DD/YYYY');
                        return (
                            <div className='comment-down'>
                                {item.userData.image ?
                                    <div className='comment-avatar'
                                        style={{backgroundImage: `url(${new Buffer(item.userData.image, 'base64').toString('binary')})`}}
                                    ></div> :
                                    <div className='comment-avatar'
                                        style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnmqNl25_iCHNWRwqjgYDZlZtgh2LPB1NZJxkS5IMAkh5m5xxRNV_--WHa_cVbUR0wKg&usqp=CAU)`}}
                                    ></div>
                                }
                                <div className='comment-content'>
                                    <div className='username'>{item.userData.firstName} {item.userData.lastName} 
                                    {this.props.userInfo && this.props.userInfo.id === item.userId ? 
                                    <> (<FormattedMessage id = "comment.me"/>)</> : ''}
                                    </div>
                                    
                                    <div className='contents'>{item.content}</div>
                                    <div className='action'>
                                    {this.props.userInfo && this.props.userInfo.id === item.userId ? 
                                    <>
                                        <div className='edit' onClick={()=>this.handleEditComment(item)}><FormattedMessage id = "comment.edit"/></div>
                                        <div className='delete' onClick={()=>this.handleDeleteComment(item)}><FormattedMessage id = "comment.delete"/></div>
                                    </> : ''}
                                        <div className='time'>{date}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                 </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
