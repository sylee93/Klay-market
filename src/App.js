import React, {useState} from 'react';
import logo from './logo.svg';
import QRcode from "qrcode.react";
import {getBalance, readCount, setCount} from './api/UseCaver.js';
import './App.css';
import * as KlipAPI from "./api/UseKlip";

// 1 Smart contract 배포 주소 파악(가져오기)
// 2 caver.js 이용해서 스마트 컨트랙트 연동하기
// 3 가져온 스마트 컨트랙트 실행 결과 웹에 표현하기

function onPressButton(balance){
  console.log('hi');
}

const onPressButton2 = (_balance,_setBalance) => {
  _setBalance(_balance);
}
const DEFAULT_QR_CODE = "DEFAULT";

function App() {
  const [balance, setBalance] = useState('0');
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  //readCount();
  //getBalance('0x8724a8f3a71d65edcb3a5bfff7913eceecedbb7c');
  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  };
  const onClickSetCount = () => {
    KlipAPI.setCount(2000,setQrvalue);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=>{
          onClickGetAddress();
          }}>주소 가져오기
        </button>
          
        <button onClick={()=>{
          onClickSetCount();
          }}>카운트 값 변경
        </button>
        <br/>
        <br/>
        <br/>
          <QRcode value={qrvalue}/>
        <p>
          {balance}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
