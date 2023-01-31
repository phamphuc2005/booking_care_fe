import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    <FormattedMessage id = "section.about"/> 
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="300px" src="https://www.youtube.com/embed/FqpZ13yVUJI" title="Giới thiệu về Đại học Bách Khoa Hà Nội" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <div>
                        <FormattedMessage id = "section.about-content"/> 
                        </div>
                        <a target='_blank' href='https://www.hust.edu.vn/documents/59786/0/20221404_Brochure+HUST+trinh+chieu+%281%29.pdf/15329f81-d577-4b29-976a-2c019109cf1a'><FormattedMessage id = "section.about-link"/></a>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
