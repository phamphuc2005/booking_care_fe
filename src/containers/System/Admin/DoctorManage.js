import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DoctorManage.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    handleSaveContentMarkdown = () => {
        console.log(this.state)
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
          console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return (
            <div className='container doctor-container'>
                <div className='title mb-4'><FormattedMessage id = "doctor-manage.title"/></div>
                <div className='row markdown-editor my-4'>
                    <div className='col-12 mt-4 more-info'>
                        <div className='content-left form-group'>
                            <label><FormattedMessage id = "doctor-manage.choose-title"/>:</label>
                            <Select
                                // className='form-control'
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={options}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label><FormattedMessage id = "doctor-manage.introduction-title"/>:</label>
                            <textarea 
                                className='form-control' 
                                rows = "3"
                                onChange={(event)=>this.handleOnChangeDesc(event)}
                                value={this.state.description}
                            ></textarea>
                        </div>
                    </div>
                    <div className='col-12 mt-2 mb-4'>
                        <MdEditor 
                            style={{ height: '500px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                        />
                    </div>
                    <div className='col-12 mb-4'>
                        <button 
                            className='btn btn-primary'
                            onClick={() => this.handleSaveContentMarkdown()}
                        >
                            <FormattedMessage id = "doctor-manage.save-btn"/> 
                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
