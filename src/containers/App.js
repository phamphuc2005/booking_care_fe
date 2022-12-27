import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
import HomePage from './HomePage/HomePage';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';
import Patient from '../routes/Patient';
import VerifyMail from './Patient/VerifyMail';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';

import CustomScrollbars from '../components/CustomScrollbars';
import ListDoctor from './Patient/Doctor/ListDoctor';
import ListSpecialty from './Patient/Specialty/ListSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';
import ListClinic from './Patient/Clinic/ListClinic';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />

                        <div className="content-container">
                            <CustomScrollbars style={{height:'100vh', width:'100%'}}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.PATIENT} component={userIsAuthenticated(Patient)} />
                                    <Route path={path.HOMEPAGE} exact component={(HomePage)} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor}/> 
                                    <Route path={path.LIST_DOCTOR} component={ListDoctor}/> 
                                    <Route path={path.VERIFY_BOOKING_MAIL} component={VerifyMail}/> 
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty}/> 
                                    <Route path={path.LIST_SPECIALTY} component={ListSpecialty}/> 
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic}/> 
                                    <Route path={path.LIST_CLINIC} component={ListClinic}/> 
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position="top-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);