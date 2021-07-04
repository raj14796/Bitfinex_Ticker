import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createWebSocketConnection, closeWebSocketConnection } from './action/action'
import Ticker from './Ticker'
import './style.css'

const App = () => {
    const webSocketIsConnected = useSelector(state => state.connection)
    const [connectButtonIsClicked, setConnectButtonIsClicked] = useState(true)
    const dispatch = useDispatch();
    const ws = useMemo(() => new WebSocket('wss://api-pub.bitfinex.com/ws/2'), [connectButtonIsClicked])

    useEffect(() => {
        if (connectButtonIsClicked) {
            function alwaysRun(runOnlyForServerError) {
                dispatch(createWebSocketConnection(ws));
                if (!webSocketIsConnected) {
                    console.log("webSocketIsConnected",webSocketIsConnected)
                    runOnlyForServerError()
                }
            }
            alwaysRun(function () {
                setTimeout(() => {
                    const ws2 = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
                    dispatch(createWebSocketConnection(ws2));
                }, 2000)
            })
        }
    }, [dispatch, connectButtonIsClicked, ws, webSocketIsConnected])

    const handleConnect = () => {
        setConnectButtonIsClicked(true)
    }

    const handleDisconnect = () => {
        setConnectButtonIsClicked(false)
        dispatch(closeWebSocketConnection(ws))
    }

    return (
        <div>
            <Ticker />
            <div className="buttonsDiv">
                <button className="button1" disabled={connectButtonIsClicked} onClick={() => handleConnect()}>Connect</button>
                <button className="button2" disabled={!connectButtonIsClicked} onClick={() => handleDisconnect()}>Disconnect</button>
            </div>
        </div>
    )
}

export default App
