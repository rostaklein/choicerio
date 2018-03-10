export const actionTypes = {
    ADD: 'ADD',
    SETCOUNT: 'SETCOUNT',
    SETNUMTITLE: 'SETNUMTITLE',
    SETUSER: 'SETUSER'
}

export const addCount = () => dispatch => {
    return dispatch({ type: actionTypes.ADD })
}
export const setCount = (count) => dispatch => {
    return dispatch({ type: actionTypes.SETCOUNT, count: count })
}
export const setNumberAsTitle = () => dispatch => {
    return dispatch({ type: actionTypes.SETNUMTITLE })
}
export const setActiveUser = (user) => dispatch => {
    return dispatch({ type: actionTypes.SETUSER, user: user})
}