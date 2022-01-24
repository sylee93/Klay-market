import logo from './logo.svg';
import Caver from 'caver-js';
import './App.css';

const COUNT_COUNTRACT_ADDRESS = '0x06248e146BDd0Fc68685f643E5570dcB0b613EEa';
const ACCESS_KEY_ID = 'KASKBY490VI08E20Z1JVOLGN';
const SECRET_KEY_ID ='q68n5eUS0iPDXTNqnT0OBUCihWJfiWOWDS3xhK1o';
const CHAIN_ID = '1001'; // MAINNET 8217 / TESTNET 1001

const option = {
  headers: [
    {
      name: "Authorrization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_KEY_ID).toString("base64")
    },
    {name: "x-chain-id", value: CHAIN_ID}
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));

// 1 Smart contract 배포 주소 파악(가져오기)
// 2 caver.js 이용해서 스마트 컨트랙트 연동하기
// 3 가져온 스마트 컨트랙트 실행 결과 웹에 표현하기

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          good <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>r
      </header>
    </div>
  );
}

export default App;
