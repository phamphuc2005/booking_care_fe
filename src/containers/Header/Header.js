import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, patientMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount() {
        let {userInfo} = this.props;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }  
            if(role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
            if(role === USER_ROLE.PATIENT) {
                menu = patientMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Link className="btn home" to={'/home'} title='Home'>
                        <i className="fas fa-home"></i>
                    </Link>
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='header-end'>
                    <span className='welcome'>
                        {this.props.userInfo && this.props.userInfo.image ?
                            <div className='user-avatar'
                                style={{backgroundImage: `url(${new Buffer(this.props.userInfo.image, 'base64').toString('binary')})`}}
                            ></div> :
                            <div className='user-avatar'
                                style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnmqNl25_iCHNWRwqjgYDZlZtgh2LPB1NZJxkS5IMAkh5m5xxRNV_--WHa_cVbUR0wKg&usqp=CAU)`}}
                            ></div>
                        }
                        <div className='username'>
                            {userInfo && userInfo.firstName ? userInfo.firstName : ''} {userInfo && userInfo.lastName ? userInfo.lastName : ''}
                        </div>
                    </span>
                    <i className="fas fa-globe languages"></i>
                    <span 
                        className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} 
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                    >VN</span>
                    <span 
                        className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} 
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                    >EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
