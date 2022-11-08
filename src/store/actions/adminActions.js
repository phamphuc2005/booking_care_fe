import actionTypes from './actionTypes';
import {getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService} from '../../services/userService';
import { toast, Toast } from 'react-toastify';

export const fetchGenderStart = () => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', error);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData    
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchRoleStart = () => {
    // type: actionTypes.FETCH_ROLE_START
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_ROLE_START})
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', error);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData    
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    // type: actionTypes.FETCH_POSITION_START
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_POSITION_START})
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', error);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData    
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if(res && res.errCode === 0) {
                toast.success("Create user successfully!");
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Create user failed!");
                dispatch(createUserFailed());
            }
        } catch (error) {
            toast.error("Create user failed!");
            dispatch(createUserFailed());
            console.log('createNewUser error', error);
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,  
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if(res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users));
            } else {
                toast.error("Get all user failed!");
                dispatch(fetchAllUserFailed());
            }
        } catch (error) {
            toast.error("Get all user failed!");
            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserStart error', error);
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data  
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0) {
                toast.success("Delete user successfully!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Delete user failed!");
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            toast.error("Delete user failed!");
            dispatch(deleteUserFailed());
            console.log('deleteUser error', error);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,  
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if(res && res.errCode === 0) {
                toast.success("Update user successfully!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Update user failed!");
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error("Update user failed!");
            dispatch(editUserFailed());
            console.log('editUser error', error);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,  
})

export const editUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})