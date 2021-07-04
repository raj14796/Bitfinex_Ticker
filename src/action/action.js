
export const createWebSocketConnection = (ws) => async (dispatch) => {
    ws.onmessage = (msg) => {
        //console.log(JSON.parse(msg.data))
        let msgData = JSON.parse(msg.data)
        if (msgData[1] instanceof Array)
            dispatch({
                type: 'MESSAGE_DATA',
                payLoad: msgData[1]
            })
    }

    let msg = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD'
    })


    ws.onopen = () => {
        dispatch({
            type: 'CONNECTION',
            payLoad: true
        })
        ws.send(msg)
        //console.log('connected')
        alert('Connected')
    }

    ws.onclose = () => {
        //console.log('disconnected')
        dispatch({
            type: 'CONNECTION',
            payLoad: false
        })
        alert('Disconnected')
    }

    ws.onerror = (err) => {
        //console.error('WebSocket encountered error: ', err.message, 'Disconnecting WebSocket');
        alert('WebSocket encountered error: ' + err.message + '\nDisconnecting WebSocket')
        ws.close();
    }
}

export const closeWebSocketConnection = (ws) => async () => {
    ws.close()
}