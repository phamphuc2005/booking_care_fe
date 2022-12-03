import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import {LANGUAGES, CommonUtils} from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './SpecialtyManage.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { createSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class SpecialtyManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }

    async componentDidMount() {

    }

    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.language !== prevProps.language) {
        //     let allDates = this.getArrDates(this.props.language);
        //     this.setState({
        //         allDates: allDates
        //     })
        // }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    }

    handleSaveSpecialty = async () => {
        let res = await createSpecialty(this.state);
        if(res && res.errCode === 0) {
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
            toast.success("Create specialty for success!");
        } else {
            toast.error("Create specialty for failed!")
        console.log('Error:', res)
        }
        console.log(this.state)
    } 

    render() {
        return (
            <div className='specialty-manage-container container'>
                <div className='title'><FormattedMessage id="specialty-manage.title"/></div>
                <div className='row add-specialty'> 
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="specialty-manage.name"/>:</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name}
                            onChange={(event)=>this.handleOnChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className='col-6 form-group mt-4'>
                        <label><FormattedMessage id="specialty-manage.image"/>:</label>
                        <input 
                            className='form-control-file' 
                            type='file' 
                            style={{ backgroundColor: 'white', width: '100%', marginTop: '4px' }}
                            onChange={(event) => this.handleOnChangeImg(event)}
                        ></input>
                    </div>
                    <div className='col-12'>
                        <MdEditor 
                            style={{ height: '400px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} 
                        />
                    </div>
                    <div className='col-12 my-4'>
                        <button 
                            className='btn btn-primary'
                            onClick={()=>this.handleSaveSpecialty()}
                        ><FormattedMessage id="specialty-manage.save-btn"/></button>
                    </div>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
