import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword});
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user',data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user',{id: userId})
    return axios.delete('/api/delete-user',{
        data: {
            id: userId
        }
    })

}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user',inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors');
}

const saveDoctorInfo = (data) => {
    return axios.post('/api/save-info-doctor', data);
}

const getDetailDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-Id?id=${inputId}`);
}

const saveDoctorSchedule = (data) => {
    return axios.post('/api/save-schedule-doctor', data);
}

const getDoctorScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-doctor-schedule-by-date?doctorId=${doctorId}&date=${date}`);
}

const getMoreDoctorInfo = (inputId) => {
    return axios.get(`/api/get-more-doctor-info-by-Id?id=${inputId}`);
}

const getProfileDoctor = (inputId) => {
    return axios.get(`/api/get-profile-doctor-by-Id?id=${inputId}`);
}

const postPatientBooking = (data) => {
    return axios.post('/api/patient-booking', data);
}

const postVerifyBooking = (data) => {
    return axios.post('/api/verify-booking', data);
}

const createSpecialty = (data) => {
    return axios.post('/api/create-specialty', data);
}

const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty');
}

const editSpecialty = (inputData) => {
    return axios.put('/api/edit-specialty',inputData);
}

const deleteSpecialty = (inputId) => {
    return axios.delete('/api/delete-specialty',{
        data: { id: inputId }
    })

}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDoctorInfo,
    getDetailDoctor,
    saveDoctorSchedule,
    getDoctorScheduleByDate,
    getMoreDoctorInfo,
    getProfileDoctor,
    postPatientBooking,
    postVerifyBooking,
    createSpecialty,
    getAllSpecialty,
    editSpecialty,
    deleteSpecialty
}