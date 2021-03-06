import Cookies from 'js-cookie';

export const actionTypes = {
    SETTITLE: 'SETTITLE',
    SETUSER: 'SETUSER',
    SETMODAL: 'SETMODAL',
    EDITFORM: 'EDITFORM',
    SETFORMDATA: 'SETFORMDATA',
    RESETFORMDATA: 'RESETFORMDATA',
    ADD_ANSWER: 'ADD_ANSWER',
    SET_CANDIDATE: 'SET_CANDIDATE',
    ADD_ERROR: 'ADD_ERROR'
};

export const setPageTitle = title => dispatch => {
    return dispatch({ type: actionTypes.SETTITLE, pageTitle: title });
};
export const setActiveUser = user => dispatch => {
    return dispatch({ type: actionTypes.SETUSER, user });
};
export const logOut = () => dispatch => {
    Cookies.remove('token');
    return dispatch({ type: actionTypes.SETUSER, user: null});
};
export const setActiveModal = modal => dispatch => {
    return dispatch({ type: actionTypes.SETMODAL, modal })
}
export const setFormData = formData => dispatch => {
    return dispatch({ type: actionTypes.SETFORMDATA, form: formData})
}
export const resetFormData = () => dispatch => {
    return dispatch({ type: actionTypes.RESETFORMDATA})
}
export const editForm = property => dispatch => {
    return dispatch({ type: actionTypes.EDITFORM, property })
}
export const addAnswer = answer => dispatch => {
    return dispatch({ type: actionTypes.ADD_ANSWER, answer })
}
export const setAnsweringCandidate = candidate => dispatch => {
    return dispatch({ type: actionTypes.SET_CANDIDATE, candidate })
}
export const addError = ({type, msg}) => dispatch => {
    return dispatch({ type: actionTypes.ADD_ERROR, error: {type, msg} })
}