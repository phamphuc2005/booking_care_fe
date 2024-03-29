import actionTypes from './actionTypes';
import {getAllCodeService, 
    createNewUserService, 
    getAllUsers, 
    deleteUserService, 
    editUserService, 
    getTopDoctorHomeService, 
    getAllDoctors,
    saveDoctorInfo,
    getAllSpecialty,
    getAllClinic
} from '../../services/userService';
import { toast } from 'react-toastify';

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
                toast.success("Tạo người dùng thành công!");
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Tạo người dùng thất bại!");
                dispatch(createUserFailed());
            }
        } catch (error) {
            toast.error("Tạo người dùng thất bại!");
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
                toast.error("Lấy dữ liệu toàn bộ người dùng thất bại!");
                dispatch(fetchAllUserFailed());
            }
        } catch (error) {
            toast.error("Lấy dữ liệu toàn bộ người dùng thất bại!");
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
                toast.success("Xóa người dùng thành công!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Xóa người dùng thất bại!");
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            toast.error("Xóa người dùng thất bại!");
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
                toast.success("Cập nhật người dùng thành công!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Cập nhật người dùng thất bại!");
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error("Cập nhật người dùng thất bại!");
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

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDoctorInfo(data);
            if (res && res.errCode === 0){
                toast.success("Lưu thông tin bác sĩ thành công!");
                dispatch({
                    type: actionTypes.SAVE_DOCTOR_INFO_SUCCESS,
                })
            } else {
                toast.error("Lưu thông tin bác sĩ thất bại!");
                dispatch({
                    type: actionTypes.SAVE_DOCTOR_INFO_FAILED,
                })
            }
        } catch (error) {
            console.log(error)
            toast.error("Lưu thông tin bác sĩ thất bại!");
            dispatch({
                type: actionTypes.SAVE_DOCTOR_INFO_FAILED,
            })
        }
    }
}

export const fetchAllcodeTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_TIME_FAILED,
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_TIME_FAILED,
            })
        }
    }
}

export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START})
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if(resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0) {
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
                        resSpecialty_vi: resSpecialty.data_vi,
                        resSpecialty_en: resSpecialty.data_en,
                        resClinic_vi: resClinic.data_vi,
                        resClinic_en: resClinic.data_en
                    }
                dispatch(fetchRequiredDoctorInfoSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInfoFailed());
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInfoFailed());
            console.log('fetchRequiredDoctorInfoStart error', error);
        }
    }
}

export const fetchRequiredDoctorInfoSuccess = (requiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: requiredData    
})

export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})
