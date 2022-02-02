import React, {useState} from 'react';
import logo from './logo.svg';
import QRcode from "qrcode.react";
import {getBalance, readCount, setCount} from './api/UseCaver.js';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './market.css';
import * as KlipAPI from "./api/UseKlip";
import { Alert, Container } from "react-bootstrap";

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
const DEFAULT_ADDRESS = "0x00000000000000000000000000000";

function App() {
  // state data

  // gloval data
  // address
  // nft
  const [nfts, setNFTs] = useState([]);
  const [myBalance, setMyBalance] = useState('0');
  const [myAddress, setMyAddress] = useState('0x00000000000000000000000000000');

  // UI
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  // tab
  // mintInput

  // Modal
  
  // fetchMarketNFTs
  // fetchMyNFTs
  // onclickMint
  // onClickMyCard
  // onClickMarketCard
  
  const getUserData = () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      setMyAddress(address);
      const _balance = await getBalance(address);
      setMyBalance(_balance);
    });
  };

  return (
    <div className="App">
        <div style={{backgroundColor: "black", padding:10}}>
          <div
            style={{
              fontSize: 30,
              fontWeight: "bold",
              paddingLeft: 5,
              marginTop: 10,
            }}
          >
            내지갑
          </div>
          {myAddress}
          <br/>
          <Alert 
            onClick={getUserData}
            variant={"balance"} 
            style={{backgroundColor:"#f40075", fontsize: 25}}
          >
            {myBalance}
          </Alert>
        </div>
        {/* 주소 잔고 */}
        <Container 
          style={{
            backgroundColor:"white",
            width: 172,
            height: 172,
            padding: 20,
          }}
        >   
        <QRcode value={qrvalue} /> 
        </Container>
        {/* 갤러리(마켓, 내 지갑) */}
        {/* 발행 페이지 */}
        {/* 탭 */}
        {/* 모다류 */}
    </div>
  );
}

export default App;

