import React from 'react'
import './style.css';
import bitcoinLogo from './bitcoin.png'
import { useSelector } from 'react-redux';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Ticker = () => {
    const msgData = useSelector(state => state.msgData.map((aData, index) => index === 5 ? (aData * 100).toFixed(2) : aData.toFixed(2)))
    const dailyChangePositive = () => {
        if (msgData[5] < 0)
            return false
        return true
    }
    return (
        <>
            <div className="tickerBox">
                <img src={bitcoinLogo} alt="bitcoinLogo" className="logo"></img>
                <div className="tickerData">
                    <div>
                        <p>BTC/USD</p>
                        <p><span>VOL</span>&nbsp;&nbsp;{msgData[7]}&nbsp;<span>BTC</span></p>
                        <p><span>LOW</span>&nbsp;&nbsp;{msgData[9]}</p>
                    </div>
                    <div>
                        <p>{msgData[6]}</p>
                        <p id={dailyChangePositive() ? "dailyChange1" : "dailyChange2"}>{msgData[4]} {dailyChangePositive() ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} ({msgData[5]}%)</p>
                        <p><span>HIGH</span>&nbsp;&nbsp;{msgData[8]}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ticker
