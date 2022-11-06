import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: []
        }
    }

    async componentDidMount() {
        try {
            let gender = await getAllCodeService('gender');
            if(gender && gender.errCode === 0) {
                this.setState({
                    genderArr: gender.data
                })
            }

            let role = await getAllCodeService('role');
            if(role && role.errCode === 0) {
                this.setState({
                    roleArr: role.data
                })
            }

            let position = await getAllCodeService('position');
            if(position && position.errCode === 0) {
                this.setState({
                    positionArr: position.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;

        return (
            <div className='user-redux-container'>
                <div className='title'>User redux</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mt-2 mb-4'>-- <FormattedMessage id = "user-manage.create-title"/> --</div>
                            <div className='col-3'>
                                <label>Email:</label>
                                <input 
                                    className='form-control'
                                    type='email' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.password"/>:</label>
                                <input 
                                    className='form-control'
                                    type='password' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.firstname"/>:</label>
                                <input 
                                    className='form-control'
                                    type='text' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.lastname"/>:</label>
                                <input 
                                    className='form-control'
                                    type='text' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-4'>
                                <label><FormattedMessage id = "user-manage.phone"/>:</label>
                                <input 
                                    className='form-control'
                                    type='number' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-8'>
                                <label><FormattedMessage id = "user-manage.address"/>:</label>
                                <input 
                                    className='form-control'
                                    type='text' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.gender"/>:</label>
                                <select className='form-control'>
                                    <option value="">-- Choose option --</option>
                                    {genders && genders.length>0 && genders.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select> 
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.role"/>:</label>
                                <select className='form-control'>
                                    <option value="">-- Choose option --</option>
                                    {roles && roles.length>0 && roles.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select> 
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.position"/>:</label>
                                <select className='form-control'>
                                    <option value="">-- Choose option --</option>
                                    {positions && positions.length>0 && positions.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select> 
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "user-manage.avatar"/>:</label>
                                <input 
                                    className='form-control'
                                    type='text' 
                                    // onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className='col-12 mt-4'>
                                <button className='btn btn-primary'><FormattedMessage id = "user-manage.save-btn"/></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
