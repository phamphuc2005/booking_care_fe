import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import AppointmentManage from '../containers/System/Doctor/AppointmentManage';
import PatientManage from '../containers/System/Doctor/PatientManage';
import PersonalManage from '../containers/System/Doctor/PersonalManage';
import ScheduleManage from '../containers/System/Doctor/ScheduleManage';


class Doctor extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container" style={{ margin: '80px 0 0 0 ' }}>
                    <div className="system-list">
                        <Switch>
                            {/* <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} /> */}
                            <Route path="/doctor/doctor-manage" component={PersonalManage} />
                            <Route path="/doctor/schedule-manage" component={ScheduleManage} />
                            <Route path="/doctor/appointment-manage" component={AppointmentManage} />
                            <Route path="/doctor/patient-manage" component={PatientManage} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
