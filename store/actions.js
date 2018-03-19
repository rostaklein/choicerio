import Cookies from 'js-cookie';

export const actionTypes = {
    ADD: 'ADD',
    SETCOUNT: 'SETCOUNT',
    SETNUMTITLE: 'SETNUMTITLE',
    SETUSER: 'SETUSER',
    SETMODAL: 'SETMODAL'
};

export const addCount = () => dispatch => {
    return dispatch({ type: actionTypes.ADD });;
};
export const setCount = count => dispatch => {
    return dispatch({ type: actionTypes.SETCOUNT, count: count });
};
export const setNumberAsTitle = () => dispatch => {
    return dispatch({ type: actionTypes.SETNUMTITLE });
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