const msgData = (msgDataState = [], action) => {
    if (action.type === 'MESSAGE_DATA') {
        //console.log(action.payLoad)
        return action.payLoad
    }
    else {
        return msgDataState
    }
}

export default msgData