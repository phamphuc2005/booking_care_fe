import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import AppointmentSchedule from '../containers/System/Patient/AppointmentSchedule';
import History from '../containers/System/Patient/History';
import PersonalInfo from '../containers/System/Patient/PersonalInfo';

class Patient extends Component {
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
                            <Route path="/patient/patient-manage" component={PersonalInfo} />
                            <Route path="/patient/appointment-manage" component={AppointmentSchedule} />
                            <Route path="/patient/history-manage" component={History} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
