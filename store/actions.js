import Cookies from 'js-cookie';

export const actionTypes = {
    SETTITLE: 'SETTITLE',
    SETUSER: 'SETUSER',
    SETMODAL: 'SETMODAL',
    EDITFORM: 'EDITFORM',
    SETFORMDATA: 'SETFORMDATA',
    RESETFORMDATA: 'RESETFORMDATA'
};

export const setPageTitle = title => dispatch => {
    return dispatch({ type: actionTypes.SETTITLE, pageTitle: title });
};
export const setActiveUser = user => dispatch => {
    return dispatch({ type: actionTypes.SETUSER, user: user});
};
export const logOut = () => dispatch => {
    Cookies.remove('token');
    return dispatch({ type: actionTypes.SETUSER, user: null});
};
export const setActiveModal = modal => dispatch => {
    return dispatch({ type: actionTypes.SETMODAL, modal: modal})
}
export const setFormData = formData => dispatch => {
    return dispatch({ type: actionTypes.SETFORMDATA, form: formData})
}
export const resetFormData = () => dispatch => {
    return dispatch({ type: actionTypes.RESETFORMDATA})
}
export const editForm = property => dispatch => {
    return dispatch({ type: actionTypes.EDITFORM, property: property})
}