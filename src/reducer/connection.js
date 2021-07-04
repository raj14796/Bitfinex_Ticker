const connection = (connectionState = true, action) => {
    if (action.type === 'CONNECTION') {
        return action.payLoad
    }
    else {
        return connectionState
    }
}

export default connection;