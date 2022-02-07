import React, {useState} from 'react';
import QRcode from "qrcode.react";
import {fetchCardsOf, getBalance} from './api/UseCaver.js';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './market.css';
import * as KlipAPI from "./api/UseKlip";
import { Alert, Card, Container, Nav, Form, Button } from "react-bootstrap";
import { MARKET_CONTRACT_ADDRESS } from './constants';

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
  const [nfts, setNFTs] = useState([]); // {tokenId:'101', tokenUri: ''}
  const [myBalance, setMyBalance] = useState("0");
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);

  // UI
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [tab, setTab] = useState("MINT") // MARKET, MINT, WALLET
  const [mintImageUrl, setMintImageUrl] = useState("");
  // tab
  // mintInput

  // Modal
  
  // fetchMarketNFTs
  const fetchMarketNFTs = async () => {
    const _nfts = await fetchCardsOf(MARKET_CONTRACT_ADDRESS);
    setNFTs(_nfts);
  }
  // fetchMyNFTs
  const fetchMyNFTs = async () => {
    const _nfts = await fetchCardsOf(myAddress);
    setNFTs(_nfts);
  }

  // onclickMint
  const onClickMint = async (uri) => {
    if(myAddress === DEFAULT_ADDRESS) alert("NO ADDRESS");
    const randomTokenId = parseInt(Math.random() * 1000000);
    KlipAPI.mintCardWithURI(myAddress, randomTokenId, uri, setQrvalue, (result) => {
      alert(JSON.stringify(result));
    });
  };
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
          {/* 주소 잔고 */}
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
          <Container 
            style={{
              backgroundColor:"white",
              width: 300,
              height: 300,
              padding: 20,
            }}
          >   
          <QRcode value={qrvalue} size={256} style={{margin: "auto"}}/> 
          </Container>
          {/* 갤러리(마켓, 내 지갑) */}
          {tab === "MARKET" || tab === "WALLET" ? (
            <div className="container" style={{padding:0, width:"100%"}}>
              {nfts.map((nft, index) => (
                <Card.Img className="img-responsive" src={nfts[index].uri} />
              ))}
          </div>
          ) : null}
          {/* 발행 페이지 */}
          {tab === "MINT" ? (
            <div className="container" style={{padding:0, width:"100%"}}>
              <Card className="text-center" style={{color: "black", height:"50%", borderColor: "#C5B35B"}}>
                  <Card.Body style={{ opacity: 0.9, backgroundColor: "black"}}>
                    {mintImageUrl !== "" ? (
                      <Card.Img src={mintImageUrl} height={"50%"} />
                    ) : null}
                    <Form>
                      <Form.Group>
                        <Form.Control 
                          value={mintImageUrl}
                          onChange={(e)=> {
                            console.log(e.target.value);
                            setMintImageUrl(e.target.value);
                          }}
                          type="text"
                          placeholder="이미지 주소를 입력해주세요"
                        />
                      </Form.Group>
                      <br/>
                      <Button
                        onClick={() => {
                          onClickMint(mintImageUrl);
                        }}
                        variant="primary"
                        style={{
                          backgroundColor:"#810034", 
                          borderColor:"#810034"
                        }}
                      >
                        발행하기
                      </Button>
                    </Form>
                  </Card.Body>
              </Card>
            </div>
          ) : null}
        </div>

        <button onClick={fetchMyNFTs}>
          NFT 가져오기
        </button>

        {/* 모달 */}
        {/* 탭 */}
        <nav style={{backgroundColor: "#1b1717", height: 45 }} className="navbar fixed-bottom navbar-light" role="navigation">
          <Nav className="w-100">
            <div className='d-flex flex-row justify-content-around w-100'>
              <div onClick={()=>{
                setTab("MARKET");
                fetchMarketNFTs();
              }}
                className="row d-flex flex-column justify-content-center align-items-center">
              </div>
              <div>MARKET</div>

              <div onClick={()=>{
                setTab("MINT");
              }}
                className="row d-flex flex-column justify-content-center align-items-center">
              </div>
              <div>MINT</div>
              
              <div onClick={()=>{
                setTab("WALLET");
                fetchMyNFTs();
              }}
                className="row d-flex flex-column justify-content-center align-items-center">
              </div>
              <div>WALLET</div>
            </div>
          </Nav>
        </nav>
    </div>
  );
}

export default App;

