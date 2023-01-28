import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword});
}

const handleRegister = (data) => {
    return axios.post('/api/register',data)
}

const handleConfirmRegister = (data) => {
    return axios.post('/api/confirm-register',data)
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

const deleteSchedule = (inputId) => {
    return axios.delete('/api/delete-schedule',{
        data: { id: inputId }
    })
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

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createClinic = (data) => {
    return axios.post('/api/create-clinic', data);
}

const getAllClinic = () => {
    return axios.get('/api/get-all-clinic');
}

const editClinic = (inputData) => {
    return axios.put('/api/edit-clinic',inputData);
}

const deleteClinic = (inputId) => {
    return axios.delete('/api/delete-clinic',{
        data: { id: inputId }
    })
}

const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getListAppointmentForDoctor = (data) => {
    return axios.get(`/api/get-list-appointment?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendConfirm= (data) => {
    return axios.post('/api/send-confirm', data);
}

const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`)
}

const getListScheduleForPatient = (data) => {
    return axios.get(`/api/get-list-schedule?id=${data.patientId}`)
}

const getHistory = (data) => {
    return axios.get(`/api/get-history?id=${data.patientId}`)
}

const cancelAppointment = (inputData) => {
    return axios.put('/api/cancel-appointment',inputData);
}

const confirmCancel = (inputData) => {
    return axios.put('/api/confirm-cancel',inputData);
}

const createComment = (data) => {
    return axios.post('/api/create-comment', data);
}

const getAllComment = (data) => {
    return axios.get(`/api/get-all-comment?id=${data.id}&order=${data.order}`);
}

const editComment = (inputData) => {
    return axios.put('/api/edit-comment',inputData);
}

const deleteComment = (inputId) => {
    return axios.delete('/api/delete-comment',{
        data: { id: inputId }
    })
}

export {
    handleLoginApi,
    handleRegister,
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
    deleteSpecialty,
    getDetailSpecialtyById,
    createClinic,
    getAllClinic,
    editClinic,
    deleteClinic,
    getDetailClinicById,
    getListAppointmentForDoctor,
    postSendConfirm,
    getListPatientForDoctor,
    deleteSchedule,
    getListScheduleForPatient,
    getHistory,
    cancelAppointment,
    confirmCancel,
    handleConfirmRegister,
    createComment,
    getAllComment,
    editComment,
    deleteComment
}