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
                            Trường Đại học Bách khoa Hà Nội (tên tiếng Anh Hanoi University of Science and Technology – viết tắt HUST) được thành lập theo Nghị định số 147/NĐ ngày 6-3-1956 do Bộ trưởng Bộ Giáo dục Nguyễn Văn Huyên ký. Đây là trường đại học kỹ thuật đầu tiên của nước ta có nhiệm vụ đào tạo kỹ sư công nghiệp cho công cuộc xây dựng CNXH ở miền Bắc và đấu tranh giải phóng miền Nam; là trung tâm đào tạo, nghiên cứu khoa học và công nghệ đa ngành, đa lĩnh vực; kết hợp chặt chẽ giữa đào tạo với nghiên cứu khoa học nhằm tạo nguồn nhân lực chất lượng cao và bồi dưỡng nhân tài khoa học, công nghệ; định hướng phát triển thành đại học nghiên cứu ngang tầm với các đại học có uy tín trong khu vực và trên thế giới.
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
